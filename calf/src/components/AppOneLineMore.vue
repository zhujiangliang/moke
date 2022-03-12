<template>
  <el-popover
    class="one-line-more"
    :style="{ width: componentWidth }"
    trigger="hover"
    :width="width"
    :placement="placement"
    :disabled="disabled || !showEllipsis"
    :popper-class="getPopperClass">
    <div
      slot="reference"
      ref="reference"
      class="one-line-reference"
      :class="[multiple ? 'multi-truncate' : 'text-ellipsis', { 'text-primary': link }]"
      :style="{ '-webkit-line-clamp': multiple ? line : '' }"
      @mouseenter="handleMouseEnter($event)">
      <slot name="reference">
        <template v-if="link">
          <router-link v-if="to" :to="to" v-bind="$attrs">
            {{ actualText }}
          </router-link>
          <a v-else class="link-text" @click="linkClick">{{ actualText }}</a>
        </template>
        <template v-else>
          {{ actualText }}
        </template>
      </slot>
    </div>
    <slot>{{ commaToNewline ? actualText.replace(/(,|，)/g, "\n") : text }}</slot>
  </el-popover>
</template>

<script>
  export default {
    name: 'AppOneLineMore',
    props: {
      text: {
        type: [String, Number],
        default: '--'
      },
      placement: {
        type: String,
        default: 'right'
      },
      width: {
        type: [String, Number],
        default: null
      },
      // 是否为链接
      link: {
        type: Boolean,
        default: false
      },
      // 是否把逗号转换为换行符
      commaToNewline: {
        type: Boolean,
        default: false
      },
      // 是否为多行出现省略号
      multiple: {
        type: Boolean,
        default: false
      },
      // multiple 为 true 时有效，表示多行的行数
      line: {
        type: Number,
        default: 2
      },
      // 在 popover 中显示文本的格式
      keepBlank: {
        type: Boolean,
        default: false
      },
      // 行内模式，在单行没有超出时，设置组件宽度为内容宽度
      inline: {
        type: Boolean,
        default: false
      },
      disabled: Boolean,
      // router-link的to属性，link为truthy并且to有值则会使用router-link
      to: {
        type: [String, Object],
        default: null
      },

      popperClass: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showEllipsis: false,
        offsetWidth: null,
        componentWidth: ''
      }
    },
    computed: {
      // 实际使用文本，主要处理null值
      actualText () {
        if (this.text === 0) return '0'

        return this.text || '--'
      },

      hasKeepBlank () {
        return this.keepBlank || this.commaToNewline
      },
      getPopperClass () {
        if (this.popperClass) return this.popperClass

        if (this.hasKeepBlank) {
          return 'one-line-more-popper keep-blank'
        } else {
          return 'one-line-more-popper'
        }
      }
    },
    methods: {
      getStyle (el, prop) {
        const computedStyle = document.defaultView.getComputedStyle(el)

        return computedStyle[prop]
      },
      getTextRect (el) {
        const range = document.createRange()

        range.setStart(el, 0)
        range.setEnd(el, el.childNodes.length)

        return range.getBoundingClientRect()
      },
      // 行内模式时根据内容设置组件宽度
      settingComponentWidth (event) {
        // 未开启行内模式或者为多行模式
        if (!this.inline || this.multiple) {
          return
        }

        const el = event.target
        const rangeWidth = this.getTextRect(el).width // 文本宽度
        const padding =
          (parseInt(this.getStyle(el, 'paddingLeft'), 10) || 0) +
          (parseInt(this.getStyle(el, 'paddingRight'), 10) || 0)
        const contentWidth = rangeWidth + padding

        if (this.offsetWidth === null) {
          this.offsetWidth = el.offsetWidth
        }

        const isEll = contentWidth > this.offsetWidth || el.scrollWidth > this.offsetWidth

        this.componentWidth = !isEll ? contentWidth + 'px' : this.offsetWidth + 'px'
      },
      // 是否出现省略号
      isEllipsis (event) {
        const el = event.target
        const rangeWidth = this.getTextRect(el).width // 文本宽度
        const padding =
          (parseInt(this.getStyle(el, 'paddingLeft'), 10) || 0) +
          (parseInt(this.getStyle(el, 'paddingRight'), 10) || 0)

        return rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth
      },
      // 多行是否出现省略号
      isMultiEllipsis (event) {
        const el = event.target
        const rangeHeight = this.getTextRect(el).height // 文本高度
        const elLineHeight = parseInt(this.getStyle(el, 'lineHeight'), 10) // 元素行高

        return rangeHeight > elLineHeight * this.line || el.scrollHeight > el.offsetHeight
      },
      handleMouseEnter (event) {
        this.showEllipsis = this.multiple ? this.isMultiEllipsis(event) : this.isEllipsis(event)
      },
      linkClick () {
        this.$emit('click')
      }
    },
    watch: {
      text () {
        this.$nextTick(() => {
          this.settingComponentWidth({
            target: this.$refs.reference
          })
        })
      }
    },
    mounted () {
      this.settingComponentWidth({
        target: this.$refs.reference
      })
    }
  }
</script>

<style lang="scss">
  .one-line-more-popper {
    max-width: 600px;

    &.keep-blank {
      white-space: pre-wrap;
    }
  }
</style>

<style lang="scss" scoped>
  .one-line-more {
    width: 100%;
    display: inline-block;
    vertical-align: top;

    .multi-truncate {
      display: -webkit-box;
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-all;
    }

    .one-line-reference.text-primary:hover {
      color: #0c7c7c !important;

      .link-text {
        color: #0c7c7c !important;
        cursor: pointer;
      }
    }
  }
</style>
