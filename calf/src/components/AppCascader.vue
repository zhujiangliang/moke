<!--自定义级联选择器 用法可以参照 Element  Cascader 组件
  /**
  * describe：此组件适应多选，不在适用单选，所以必传multiple: true
  * 新增参数 groupName：{ type: Array, required：no } 用于显示分组名
  * 新增参数 caseSensitive：{ type: Boolean, required：no } 用于是否模糊搜索
  * 新增参数 checkAllDescribe { type: String, required: no } 用于全选时的描述信息
  * 新增参数 selectNumberMethod：{ type: Function, required：no } 用于控制显示选择条数文案
  * 新增参数 isRemoveDuplication { type: Boolean, default: true } 用于去重和选中同一数据库保持联动(同一数据库处于不同项目组)
  * 示例：   selectNumberMethod (count) {
              return '已经选择' + count + '条数据库'
            }
  * @author zhuliang
  * @date 2021/4/16
  */
-->
<template>
  <div
    ref="reference"
    v-clickoutside="() => toggleDropDownVisible(false)"
    :class="[
      'el-cascader',
      realSize && `el-cascader--${realSize}`,
      { 'is-disabled': isDisabled }
    ]"
    @mouseenter="inputHover = true"
    @mouseleave="inputHover = false"
    @click="() => toggleDropDownVisible(readonly ? undefined : true)"
    @keydown="handleKeyDown">
    <el-input
      ref="input"
      v-model="presentText"
      :size="realSize"
      :placeholder="showPlaceholderText"
      :readonly="readonly"
      :disabled="isDisabled"
      :validate-event="false"
      :class="{ 'is-focus': dropDownVisible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput">
      <template slot="suffix">
        <i
          v-if="clearBtnVisible"
          key="clear"
          class="el-input__icon el-icon-circle-close"
          @click.stop="handleClear"></i>
        <i
          v-else
          key="arrow-down"
          :class="[
            'el-input__icon',
            'el-icon-arrow-down',
            dropDownVisible && 'is-reverse'
          ]"
          @click.stop="toggleDropDownVisible"></i>
      </template>
    </el-input>

    <div v-if="multiple" class="el-cascader__tags">
      <span class="selected-num" :class="{'text-placeholder': disabled}">{{ selectNumber }}</span>
    </div>

    <transition name="el-zoom-in-top" @after-leave="handleDropdownLeave">
      <div
        v-show="dropDownVisible"
        ref="popper"
        :class="['el-popper', 'el-cascader__dropdown', popperClass]">
        <div v-if="multiple && options.length > 0" class="search-input-self d-flex justify-content-between align-items-center">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" :disabled="!!inputValue" @change="handleCheckAllChange">
            {{ checkAllDescribe || $t('selectAll') }}
          </el-checkbox>
          <el-input
            v-if="filterable && !isDisabled"
            v-model.trim="inputValue"
            size="mini"
            type="text"
            class="el-cascader-search-input"
            :placeholder="placeholder"
            style="width: 200px;"
            clearable
            @input="handleInput"
            @click.stop="toggleDropDownVisible(true)"
            @keydown.delete="handleDelete">
            <el-button
              slot="append"
              class="d-flex justify-content-center align-items-center"
              icon="el-icon-search"
              style="width: 30px;"></el-button>
          </el-input>
        </div>
        <div v-if="groupName.length && !inputValue && options.length > 0" class="d-flex bg-text title-self-content" style="border-top: 1px solid #e4e7ed;">
          <div
            v-for="(item, index) in groupName"
            :key="index"
            class="title-self"
            :class="index === (groupName.length -1) ? 'border-right-0' : ''">
            {{ item }}
          </div>
        </div>
        <div v-else class="d-flex bg-text title-self-content border-top">
          <div
            v-for="(item, index) in groupNameLength"
            :key="index"
            class="title-self">
          </div>
        </div>
        <el-cascader-panel
          v-show="!filtering"
          ref="panel"
          v-model="checkedValue"
          :options="options"
          :props="config"
          :border="false"
          :render-label="$scopedSlots.default"
          @expand-change="handleExpandChange"
          @close="toggleDropDownVisible(false)">
          <slot slot-scope="{node, data}" name="content" v-bind="{node,data}">
            <app-one-line-more :text="node.label" popper-class="el-cascader-line-more-popper" class="el-cascader-line-more"></app-one-line-more>
          </slot>
        </el-cascader-panel>
        <el-scrollbar
          v-if="filterable"
          v-show="filtering"
          ref="suggestionPanel"
          tag="ul"
          class="el-cascader__suggestion-panel"
          view-class="el-cascader__suggestion-list"
          @keydown.native="handleSuggestionKeyDown">
          <template v-if="suggestions.length">
            <li
              v-for="(item, index) in suggestions"
              :key="item.uid"
              :class="[
                'el-cascader__suggestion-item',
                item.checked && 'is-checked'
              ]"
              :tabindex="-1"
              @click="handleSuggestionClick(index)">
              <span>{{ item.text }}</span>
              <i v-if="item.checked" class="el-icon-check"></i>
            </li>
          </template>
          <slot v-else name="empty">
            <li class="el-cascader__empty-text">
              {{ t('el.cascader.noMatch') }}
            </li>
          </slot>
        </el-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
  import Popper from 'element-ui/src/utils/vue-popper'
  import Clickoutside from 'element-ui/src/utils/clickoutside'
  import Emitter from 'element-ui/src/mixins/emitter'
  import Locale from 'element-ui/src/mixins/locale'
  import Migrating from 'element-ui/src/mixins/migrating'
  import AriaUtils from 'element-ui/src/utils/aria-utils'
  import { t } from 'element-ui/src/locale'
  import { isEqual, isEmpty, kebabCase } from 'element-ui/src/utils/util'
  import { isUndefined, isFunction } from 'element-ui/src/utils/types'
  import { isDef } from 'element-ui/src/utils/shared'
  import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
  import debounce from 'throttle-debounce/debounce'
  import AppOneLineMore from './AppOneLineMore.vue'

  const { keys: KeyCode } = AriaUtils
  const MigratingProps = {
    expandTrigger: {
      newProp: 'expandTrigger',
      type: String
    },
    changeOnSelect: {
      newProp: 'checkStrictly',
      type: Boolean
    },
    hoverThreshold: {
      newProp: 'hoverThreshold',
      type: Number
    }
  }

  const PopperMixin = {
    props: {
      placement: {
        type: String,
        default: 'bottom-start'
      },
      appendToBody: Popper.props.appendToBody,
      visibleArrow: {
        type: Boolean,
        default: true
      },
      arrowOffset: Popper.props.arrowOffset,
      offset: Popper.props.offset,
      boundariesPadding: Popper.props.boundariesPadding,
      popperOptions: Popper.props.popperOptions
    },
    methods: Popper.methods,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy
  }

  const InputSizeMap = {
    medium: 36,
    small: 32,
    mini: 28
  }

  export default {
    name: 'ElCascader',

    directives: { Clickoutside },

    components: { AppOneLineMore },

    mixins: [PopperMixin, Emitter, Locale, Migrating],

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      options: {
        type: Array,
        default: () => []
      },
      props: {
        type: Object,
        default: () => {
          return {}
        }
      },
      size: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: () => t('el.cascader.placeholder')
      },
      disabled: Boolean,
      clearable: Boolean,
      filterable: Boolean,
      filterMethod: {
        type: Function,
        default: null
      },
      separator: {
        type: String,
        default: ' / '
      },
      showAllLevels: {
        type: Boolean,
        default: true
      },
      collapseTags: Boolean,
      debounce: {
        type: Number,
        default: 300
      },
      beforeFilter: {
        type: Function,
        default: () => { /* empty */ }
      },
      popperClass: {
        type: String,
        default: ''
      },
      groupName: {
        type: Array,
        default: () => {
          return []
        }
      },
      selectNumberMethod: {
        type: Function,
        default: null
      },
      caseSensitive: {
        type: Boolean
      },
      // 设置为false则无选择项的时候不显示选中0项
      emptyShowText: {
        type: Boolean,
        default: true
      },
      checkAllDescribe: {
        type: String,
        default: ''
      },
      isRemoveDuplication: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        dropDownVisible: false,
        checkedValue: this.value || null,
        inputHover: false,
        inputValue: null,
        presentText: null,
        presentTags: [],
        checkedNodes: [],
        filtering: false,
        suggestions: [],
        inputInitialHeight: 0,
        pressDeleteCount: 0,
        isIndeterminate: false,
        checkAll: false
      }
    },

    computed: {
      realSize () {
        const _elFormItemSize = (this.elFormItem || {}).elFormItemSize

        return this.size || _elFormItemSize || (this.$ELEMENT || {}).size
      },
      tagSize () {
        return ['small', 'mini'].indexOf(this.realSize) > -1
          ? 'mini'
          : 'small'
      },
      isDisabled () {
        return this.disabled || (this.elForm || {}).disabled
      },
      config () {
        const config = this.props || {}
        const { $attrs } = this

        Object
          .keys(MigratingProps)
          .forEach(oldProp => {
            const { newProp, type } = MigratingProps[oldProp]
            let oldValue = $attrs[oldProp] || $attrs[kebabCase(oldProp)]

            if (isDef(oldProp) && !isDef(config[newProp])) {
              if (type === Boolean && oldValue === '') {
                oldValue = true
              }

              config[newProp] = oldValue
            }
          })

        return config
      },
      multiple () {
        return this.config.multiple
      },
      leafOnly () {
        return !this.config.checkStrictly
      },
      readonly () {
        return !this.filterable || this.multiple
      },
      clearBtnVisible () {
        if (!this.clearable || this.isDisabled || this.filtering || !this.inputHover) {
          return false
        }

        return this.multiple
          ? !!this.checkedNodes.filter(node => !node.isDisabled).length
          : !!this.presentText
      },
      panel () {
        return this.$refs.panel
      },
      selectNumber () {
        let num

        if (this.isRemoveDuplication) {
          // 去重：相同数据处于不同分组
          const lastValueArr = this.checkedValue.map(item => item[item.length - 1])

          num = Array.from(new Set(lastValueArr)).length || 0
        } else {
          num = this.checkedValue.length ? this.checkedValue.length : 0
        }

        if (this.checkAllDescribe && this.checkAll) return this.checkAllDescribe
        if (this.selectNumberMethod) return this.selectNumberMethod(num)

        return !this.emptyShowText && !num ? '' : this.$t('selectedTerm', [num])
      },
      allOptions () {
        return this.flaTree(this.options)
      },
      groupNameLength () {
        let maxLength = 0

        this.allOptions.forEach(item => {
          maxLength = item.length > maxLength ? item.length : maxLength
        })

        return maxLength
      },

      showPlaceholderText () {
        if (this.multiple) {
          if (this.emptyShowText) {
            return ''
          } else {
            return this.selectNumber ? '' : '请选择'
          }
        } else {
          return this.placeholder
        }
      }
    },

    methods: {
      getMigratingConfig () {
        return {
          props: {
            'expand-trigger': 'expand-trigger is removed, use `props.expandTrigger` instead.',
            'change-on-select': 'change-on-select is removed, use `props.checkStrictly` instead.',
            'hover-threshold': 'hover-threshold is removed, use `props.hoverThreshold` instead'
          },
          events: {
            'active-item-change': 'active-item-change is renamed to expand-change'
          }
        }
      },
      toggleDropDownVisible (visible) {
        if (this.isDisabled) return

        const { dropDownVisible } = this
        const { input } = this.$refs

        visible = isDef(visible) ? visible : !dropDownVisible
        if (visible !== dropDownVisible) {
          this.dropDownVisible = visible
          if (visible) {
            this.$nextTick(() => {
              this.updatePopper()
              this.panel.scrollIntoView()
            })
          }

          input.$refs.input.setAttribute('aria-expanded', visible)
          this.$emit('visible-change', visible)
        }
      },
      handleDropdownLeave () {
        this.filtering = false
        this.inputValue = this.presentText
      },
      handleKeyDown (event) {
        switch (event.keyCode) {
          case KeyCode.enter:
            this.toggleDropDownVisible()
            break
          case KeyCode.down:
            this.toggleDropDownVisible(true)
            this.focusFirstNode()
            event.preventDefault()
            break
          case KeyCode.esc:
          case KeyCode.tab:
            this.toggleDropDownVisible(false)
            break
        }
      },
      handleFocus (e) {
        this.$emit('focus', e)
      },
      handleBlur (e) {
        this.$emit('blur', e)
      },
      handleInput (val, event) {
        !this.dropDownVisible && this.toggleDropDownVisible(true)

        if (event && event.isComposing) return
        if (val) {
          this.filterHandler()
        } else {
          this.filtering = false
        }
      },
      handleClear () {
        this.presentText = ''
        this.panel.clearCheckedNodes()
      },
      handleExpandChange (value) {
        this.$nextTick(this.updatePopper.bind(this))
        this.$emit('expand-change', value)
        this.$emit('active-item-change', value) // Deprecated
      },
      focusFirstNode () {
        this.$nextTick(() => {
          const { filtering } = this
          const { popper, suggestionPanel } = this.$refs
          let firstNode = null

          if (filtering && suggestionPanel) {
            firstNode = suggestionPanel.$el.querySelector('.el-cascader__suggestion-item')
          } else {
            const firstMenu = popper.querySelector('.el-cascader-menu')

            firstNode = firstMenu.querySelector('.el-cascader-node[tabindex="-1"]')
          }

          if (firstNode) {
            firstNode.focus()
            !filtering && firstNode.click()
          }
        })
      },
      computePresentContent () {
        // nextTick is required, because checked nodes may not change right now
        this.$nextTick(() => {
          this.computePresentText()
        })
      },
      computePresentText () {
        const { checkedValue, config } = this

        if (!isEmpty(checkedValue)) {
          const node = this.panel.getNodeByValue(checkedValue)

          if (node && (config.checkStrictly || node.isLeaf)) {
            this.presentText = node.getText(this.showAllLevels, this.separator)

            return
          }
        }

        this.presentText = null
      },
      computePresentTags () {
        const { isDisabled, leafOnly, showAllLevels, separator, collapseTags } = this
        const checkedNodes = this.getCheckedNodes(leafOnly)
        const tags = []

        const genTag = node => ({
          node,
          key: node.uid,
          text: node.getText(showAllLevels, separator),
          hitState: false,
          closable: !isDisabled && !node.isDisabled
        })

        if (checkedNodes.length) {
          const [first, ...rest] = checkedNodes
          const restCount = rest.length

          tags.push(genTag(first))

          if (restCount) {
            if (collapseTags) {
              tags.push({
                key: -1,
                text: `+ ${restCount}`,
                closable: false
              })
            } else {
              rest.forEach(node => tags.push(genTag(node)))
            }
          }
        }

        this.checkedNodes = checkedNodes
        this.presentTags = tags
      },
      getSuggestions () {
        let { filterMethod } = this

        if (!isFunction(filterMethod)) {
          if (!this.caseSensitive) {
            filterMethod = (node, keyword) => node.text.toLowerCase().includes(keyword.toLowerCase())
          } else {
            filterMethod = (node, keyword) => node.text.includes(keyword)
          }
        }

        const suggestions = this.panel.getFlattedNodes(this.leafOnly)
          .filter(node => {
            if (node.isDisabled) return false
            node.text = node.getText(this.showAllLevels, this.separator) || ''

            return filterMethod(node, this.inputValue)
          })

        if (this.multiple) {
          this.presentTags.forEach(tag => {
            tag.hitState = false
          })
        } else {
          suggestions.forEach(node => {
            node.checked = isEqual(this.checkedValue, node.getValueByOption())
          })
        }

        this.filtering = true
        this.suggestions = suggestions
        this.$nextTick(this.updatePopper)
      },
      handleSuggestionKeyDown (event) {
        const { keyCode, target } = event
        const prev = target.previousElementSibling
        const next = target.nextElementSibling

        switch (keyCode) {
          case KeyCode.enter:
            target.click()
            break
          case KeyCode.up:

            prev && prev.focus()
            break
          case KeyCode.down:

            next && next.focus()
            break
          case KeyCode.esc:
          case KeyCode.tab:
            this.toggleDropDownVisible(false)
            break
        }
      },
      handleDelete () {
        const { inputValue, pressDeleteCount, presentTags } = this
        const lastIndex = presentTags.length - 1
        const lastTag = presentTags[lastIndex]

        this.pressDeleteCount = inputValue ? 0 : pressDeleteCount + 1

        if (!lastTag) return

        if (this.pressDeleteCount) {
          if (lastTag.hitState) {
            this.deleteTag(lastIndex)
          } else {
            lastTag.hitState = true
          }
        }
      },
      handleSuggestionClick (index) {
        const { multiple } = this
        const targetNode = this.suggestions[index]

        if (multiple) {
          const { checked } = targetNode

          targetNode.doCheck(!checked)
          this.panel.calculateMultiCheckedValue()
        } else {
          this.checkedValue = targetNode.getValueByOption()
          this.toggleDropDownVisible(false)
        }
      },
      deleteTag (index) {
        const { checkedValue } = this
        const val = checkedValue[index]

        this.checkedValue = checkedValue.filter((n, i) => i !== index)
        this.$emit('remove-tag', val)
      },
      updateStyle () {
        const { $el, inputInitialHeight } = this

        if (this.$isServer || !$el) return

        const { suggestionPanel } = this.$refs
        const inputInner = $el.querySelector('.el-input__inner')

        if (!inputInner) return

        const tags = $el.querySelector('.el-cascader__tags')
        let suggestionPanelEl = null

        if (suggestionPanel && (suggestionPanelEl = suggestionPanel.$el)) {
          const suggestionList = suggestionPanelEl.querySelector('.el-cascader__suggestion-list')

          suggestionList.style.minWidth = inputInner.offsetWidth + 'px'
        }

        if (tags) {
          const { offsetHeight } = tags
          const height = Math.max(offsetHeight + 6, inputInitialHeight) + 'px'

          inputInner.style.height = height
          this.updatePopper()
        }
      },

      /**
       * public methods
       */
      getCheckedNodes (leafOnly) {
        return this.panel.getCheckedNodes(leafOnly)
      },

      flaTree (list) {
        const ret = []
        const fn = (parent, datas) => {
          if (!Array.isArray(datas)) {
            ret.push(parent)

            return
          }

          datas.forEach(it => {
            const current = [...parent, it.value]

            if (Array.isArray(it.children)) {
              fn(current, it.children)

              return
            }

            ret.push(current)
          })
        }

        fn([], list)

        return ret
      },

      // 全选
      handleCheckAllChange (val) {
        this.checkedValue = val ? this.allOptions : []
        this.isIndeterminate = false
      }
    },

    watch: {
      disabled () {
        this.computePresentContent()
      },
      value (val) {
        if (!isEqual(val, this.checkedValue)) {
          this.checkedValue = val
          this.computePresentContent()
        }
      },
      checkedValue (newVal, oldVal) {
        // 联动：相同数据处于不同分组，点击其中一个后，相同的数据库保持状态联动
        let val = []

        if (this.isRemoveDuplication) {
          const valStr = newVal.map(item => item.join('/'))
          const oldValStr = oldVal.map(item => item.join('/'))

          if (newVal.length > oldVal.length) {
            const addVal = valStr.filter(item => !oldValStr.includes(item)).map(item2 => item2.split('/'))
            const lastAddVal = addVal.map(item => item[item.length - 1])
            const relationVal = this.allOptions.filter(item => lastAddVal.includes(item[item.length - 1]))
            const nweCheckVal = Array.from(new Set(newVal.concat(relationVal).map(item => item.join('/'))))

            val = nweCheckVal.map(item => item.split('/'))
          } else {
            const cancelVal = oldValStr.filter(item => !valStr.includes(item)).map(item2 => item2.split('/'))
            const lastCancelVal = cancelVal.map(item => item[item.length - 1])
            const relationVal = this.allOptions.filter(item => lastCancelVal.includes(item[item.length - 1]))
            const nweCheckVal = relationVal.map(item => item.join('/'))

            val = valStr.filter(item => !nweCheckVal.includes(item)).map(item => item.split('/'))
          }
        } else {
          val = newVal
        }

        // 通过选择项反选全选按钮
        const checkedCount = val.length

        this.checkAll = checkedCount === this.allOptions.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allOptions.length
        const { value, dropDownVisible } = this
        const { checkStrictly, multiple } = this.config

        if (!isEqual(val, value) || isUndefined(value)) {
          this.computePresentContent()
          // hide dropdown when single mode
          if (!multiple && !checkStrictly && dropDownVisible) {
            this.toggleDropDownVisible(false)
          }

          // 用于消除去重后选中的activePath跳转
          if (this.isRemoveDuplication) {
            this.panel.handleCheckChange(val)
            multiple && this.panel.syncMultiCheckState()
            checkStrictly && this.panel.calculateCheckedNodePaths()
            this.$nextTick(this.panel.scrollIntoView)
          }

          this.$emit('input', val)
          this.$emit('change', val)
          this.dispatch('ElFormItem', 'el.form.change', [val])
        }
      },
      options: {
        handler: function () {
          this.$nextTick(this.computePresentContent)
        },
        deep: true
      },
      presentText (val) {
        this.inputValue = val
      },
      presentTags (val, oldVal) {
        if (this.multiple && (val.length || oldVal.length)) {
          this.$nextTick(this.updateStyle)
        }
      },
      filtering () {
        this.$nextTick(this.updatePopper)
      }
    },

    mounted () {
      const { input } = this.$refs

      if (input && input.$el) {
        this.inputInitialHeight = input.$el.offsetHeight || InputSizeMap[this.realSize] || 40
      }

      if (!isEmpty(this.value)) {
        this.computePresentContent()
      }

      this.filterHandler = debounce(this.debounce, () => {
        const { inputValue } = this

        if (!inputValue) {
          this.filtering = false

          return
        }

        const before = this.beforeFilter(inputValue)

        if (before && before.then) {
          before.then(this.getSuggestions)
        } else if (before !== false) {
          this.getSuggestions()
        } else {
          this.filtering = false
        }
      })

      addResizeListener(this.$el, this.updateStyle)
      // 用于传入默认选中时，判断全选状态
      const isCheckAll = this.value.length === this.allOptions.length && !!this.value.length

      this.checkAll = isCheckAll
      this.isIndeterminate = !!this.value.length && !isCheckAll
    },

    beforeDestroy () {
      removeResizeListener(this.$el, this.updateStyle)
    }
  }
</script>

<style lang="scss" scoped>
  .selected-num {
    margin-left: 10px;
    color: #0a0d14;
    font-size: 14px;
    font-family: MicrosoftYaHei;
  }
  /deep/ .search-input-self {
    height: 44px;
    padding: 0 12px;
  }
  /deep/.el-cascader-node {
    height: 32px;
    .el-cascader-node__label {
      height: 32px;
    }
  }
  .title-self-content {
    line-height: 34px;
    font-size: 12px;
    font-family: MicrosoftYaHeiSemibold;
    color: #29323c;
    .title-self {
      border-right: 1px solid #d9d9d9;
      width: 180px;
      padding-left: 17px;
    }
  }
  /deep/ .el-cascader-menu__wrap {
    min-height: 330px;
  }
  /deep/ .in-active-path {
    background-color: rgba(19, 194, 194, 0.06);
    font-weight: normal;
  }
  /deep/ .el-cascader-node.is-active {
    font-weight: normal;
  }
  .el-cascader__dropdown {
    z-index: 6000 !important;
  }
  .el-cascader-line-more {
    width: 120px;
  }

  /deep/.el-cascader-search-input {
    .el-input__validateIcon {
      display: none;
    }
  }
</style>

<style lang="scss">
  .el-cascader-line-more-popper {
    z-index: 8000 !important;
  }
</style>
