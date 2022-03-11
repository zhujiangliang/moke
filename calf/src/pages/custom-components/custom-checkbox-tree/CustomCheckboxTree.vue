<template>
  <el-card>
    <div class="content d-flex align-items-stretch">
      <!-- 左侧菜单 -->
      <div class="content-left border-right">
        <div class="d-flex justify-content-between pb-3 border-bottom">
          <div>菜单</div>
          <el-checkbox v-model="selectAllChecked" :indeterminate="allFunctionIdMsg.indeterminate" class="mr-2" @change="handleCheckedAllChange">
            全选
          </el-checkbox>
        </div>
        <div class="overflow-scroll content-left-menu">
          <el-collapse v-model="collapseOpenList">
            <el-collapse-item
              v-for="(level1, index1) of allFunctionIds"
              :key="level1.functionId"
              :name="level1.functionId"
              :class="{'character-submenu-level': level1.noSubmenu}">
              <template slot="title">
                <el-checkbox v-model="level1.checked" :indeterminate="level1.indeterminate" class="mr-3" @change="handleChildrenChecked(level1)">
                </el-checkbox>
                {{ level1.textKey }}
              </template>
              <div v-if="!level1.noSubmenu">
                <div
                  v-for="(level2, index2) of level1.children"
                  :key="level2.functionId"
                  class="ml-3 py-1 pl-1 content-left-submenu d-flex"
                  :class="{'content-left-submenu-checked':level2.functionId === submenuCheckedFunctionId}">
                  <el-checkbox v-model="level2.checked" :indeterminate="level2.indeterminate" @change="handleChildrenChecked(level2)">
                  </el-checkbox>
                  <div class="flex-grow-1 ml-3" @click="submenuClick(index1,index2,level2)">
                    {{ level2.textKey }}
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <!-- 右侧所有权限 -->
      <div class="flex-grow-1 content-right p-3" style="width: 500px;">
        <!-- 1：有tab的情况 -->
        <div v-if="rightType === 'hasTab'">
          <div
            v-for="level3 of allFunctionIds[checkedIndex1].children[checkedIndex2].children"
            :key="level3.functionId">
            <!-- 右侧第一层 -->
            <el-checkbox v-model="level3.checked" :indeterminate="level3.indeterminate" @change="handleChildrenChecked(level3)">
              {{ level3.textKey }}
            </el-checkbox>
            <div v-if="level3.children.length" class="ml-5">
              <div class="d-flex flex-wrap">
                <div v-for="level4noChildren of level3.children.filter(child => !child.children.length)" :key="level4noChildren.functionId" class="mr-3">
                  <el-checkbox v-model="level4noChildren.checked" :indeterminate="level4noChildren.indeterminate" @change="handleChildrenChecked(level4noChildren)">
                    {{ level4noChildren.textKey }}
                  </el-checkbox>
                </div>
              </div>
              <div v-for="level4 of level3.children.filter(child => child.children.length)" :key="level4.functionId">
                <el-checkbox v-model="level4.checked" :indeterminate="level4.indeterminate" @change="handleChildrenChecked(level4)">
                  {{ level4.textKey }}
                </el-checkbox>

                <div v-if="level4.children.length" class="ml-5">
                  <div class="d-flex flex-wrap">
                    <div v-for="level5noChildren of level4.children.filter(child => !child.children.length)" :key="level5noChildren.functionId" class="mr-3">
                      <el-checkbox v-model="level5noChildren.checked" :indeterminate="level5noChildren.indeterminate" @change="handleChildrenChecked(level5noChildren)">
                        {{ level5noChildren.textKey }}
                      </el-checkbox>
                    </div>
                  </div>
                  <div v-for="level5 of level4.children.filter(child => child.children.length)" :key="level5.functionId">
                    <el-checkbox v-model="level5.checked" :indeterminate="level5.indeterminate" @change="handleChildrenChecked(level5)">
                      {{ level5.textKey }}
                    </el-checkbox>

                    <div v-if="level5.children.length" class="ml-5">
                      <div class="d-flex flex-wrap">
                        <div v-for="level6noChildren of level5.children.filter(child => !child.children.length)" :key="level6noChildren.functionId" class="mr-3">
                          <el-checkbox v-model="level6noChildren.checked" :indeterminate="level6noChildren.indeterminate" @change="handleChildrenChecked(level6noChildren)">
                            {{ level6noChildren.textKey }}
                          </el-checkbox>
                        </div>
                      </div>
                      <div v-for="level6 of level5.children.filter(child => child.children.length)" :key="level6.functionId">
                        <el-checkbox v-model="level6.checked" :indeterminate="level6.indeterminate" @change="handleChildrenChecked(level6)">
                          {{ level6.textKey }}
                        </el-checkbox>

                        <div v-if="level6.children.length" class="ml-5">
                          <div class="d-flex flex-wrap">
                            <div v-for="level7noChildren of level6.children.filter(child => !child.children.length)" :key="level7noChildren.functionId" class="mr-3">
                              <el-checkbox v-model="level7noChildren.checked" :indeterminate="level7noChildren.indeterminate" @change="handleChildrenChecked(level7noChildren)">
                                {{ level7noChildren.textKey }}
                              </el-checkbox>
                            </div>
                          </div>
                          <div v-for="level7 of level6.children.filter(child => child.children.length)" :key="level7.functionId">
                            <el-checkbox v-model="level7.checked" :indeterminate="level7.indeterminate" @change="handleChildrenChecked(level7)">
                              {{ level6.textKey }}
                            </el-checkbox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 2：无tab的情况 -->
        <div v-if="rightType === 'noTab'">
        </div>
        <!-- 3：无submenu -->
        <div v-if="rightType === 'noSubmenu'">
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import { functionIds, checkedFunctionIds } from './functionIds'

  export default {
    name: 'CustomCheckboxTree',
    data () {
      return {
        collapseOpenList: [],
        selectAllChecked: false,
        rightType: 'hasTab',
        allFunctionIds: [],
        checkedIndex1: 0,
        checkedIndex2: 0,
        submenuCheckedFunctionId: '',
        checkedFunctionIds: checkedFunctionIds
      }
    },
    computed: {
      allFunctionIdMsg () {
        // 获取所有functionId和checked为true的functionId
        const allCheckedFunctionId = []
        const allFunctionId = []
        const handleAllFunctionId = function (children) {
          children.forEach(item => {
            allFunctionId.push(item.functionId)
            if (item.checked) allCheckedFunctionId.push(item.functionId)
            if (item.children.length) handleAllFunctionId(item.children)
          })
        }

        handleAllFunctionId(this.allFunctionIds)

        return {
          allCheckedFunctionId,
          indeterminate: (allCheckedFunctionId.length !== allFunctionId.length) && !!allCheckedFunctionId.length
        }
      }
    },
    methods: {
      // 初始化：遍历处理数据，设置上 checked 和 indeterminate 两个属性
      initData () {
        const allFunctionIds = functionIds
        // 特殊处理左侧没有次级菜单的项
        // const leftNoSubmenu = ['1', '2']
        const checkedFunctionIds = this.checkedFunctionIds
        const loop = function (children) {
          children.forEach(item => {
            item.textKey = item.functionId
            // checked：是否存在已选择（半选状态也算已选择）
            const checked = checkedFunctionIds.includes(item.functionId)
            // checkedAll：处理子集是否全部选中，不仅看下一级，需要遍历所有后代节点看是否全部都存在默认选中节点中
            const allChildrenFunctionIds = []
            const getAllFunctionId = function (children) {
              children.forEach(child => {
                allChildrenFunctionIds.push(child.functionId)
                if (child.children.length) getAllFunctionId(child.children)
              })
            }

            getAllFunctionId(item.children)
            const checkedAll = allChildrenFunctionIds.every(id => checkedFunctionIds.includes(id))

            if (checked && checkedAll) {
              item.checked = true
              item.indeterminate = false
            } else if (checked && !checkedAll) {
              item.checked = true
              item.indeterminate = true
            } else {
              item.checked = false
              item.indeterminate = false
            }

            // if (leftNoSubmenu.includes(item.functionId)) item.noSubmenu = true
            if (item.children.length) loop(item.children)
          })
        }

        loop(allFunctionIds)
        if (checkedFunctionIds.length) this.checkedAll = true
        this.allFunctionIds = allFunctionIds
      },

      handleChildrenChecked (levelMsg) {
        // 第一步：找到当前发生改变的functionId，如果当前checked为true/false，将后代所有checked设置为true/false，将当前及后代所有indeterminate设置为false
        const loop = function (arr) {
          arr.forEach(item => {
            if (item.functionId === levelMsg.functionId) {
              item.indeterminate = false
              const changeAllChildren = function (children) {
                children.forEach(child => {
                  child.checked = item.checked
                  child.indeterminate = false
                  if (child.children.length) changeAllChildren(child.children)
                })
              }

              changeAllChildren(item.children)
            }

            if (item.children.length) loop(item.children)
          })
        }

        loop(this.allFunctionIds)
        this.handleParentChange()
      },

      // 第二步：根据每一个functionId的后代状态来更新当前functionId的checked和indeterminate状态
      handleParentChange () {
        const loop = function (arr) {
          arr.forEach(item => {
            // 获取所有后代functionId的各种状态
            const allChildrenFunctionIds = []
            const allChildrenCheckedFunctionIds = []
            const allChildrenIndeterminateFunctionIds = []
            const getAllFunctionId = function (children) {
              children.forEach(child => {
                allChildrenFunctionIds.push(child.functionId)
                if (child.checked) allChildrenCheckedFunctionIds.push(child.functionId)
                if (child.indeterminate) allChildrenIndeterminateFunctionIds.push(child.functionId)
                if (child.children.length) getAllFunctionId(child.children)
              })
            }

            getAllFunctionId(item.children)
            const childrenLen = allChildrenFunctionIds.length
            const checkedLen = allChildrenCheckedFunctionIds.length
            const indeterminateLen = allChildrenIndeterminateFunctionIds.length

            // 第一种条件场景为：全都不勾选->勾选一个->父级都设置上半选->取消该勾选->只有直接父级的半选取消，更上级半选还在
            if (indeterminateLen && indeterminateLen === checkedLen) {
              item.checked = false
              item.indeterminate = false
            } else if (checkedLen > 0 && childrenLen !== checkedLen) {
              item.checked = true
              item.indeterminate = true
            } else if (checkedLen > 0 && childrenLen === checkedLen) {
              item.checked = true
              item.indeterminate = false
            } else if (checkedLen === 0 && childrenLen > 0) {
              item.checked = false
              item.indeterminate = false
            }

            if (item.children.length) loop(item.children)
          })
        }

        loop(this.allFunctionIds)

        // 第三步：处理全选按钮selectAllChecked状态
        if (this.allFunctionIdMsg.allCheckedFunctionId.length) this.selectAllChecked = true
        else this.selectAllChecked = false
      },

      // 处理选中的展开
      handleCollapseOpenList () {
        const list = []

        this.allFunctionIds.forEach(item => {
          if (item.checked) list.push(item.functionId)
        })
        this.collapseOpenList = list
      },

      // 处理全选事件
      handleCheckedAllChange (val) {
        const changeAllChecked = function (children) {
          children.forEach(child => {
            child.checked = val
            child.indeterminate = false
            if (child.children.length) changeAllChecked(child.children)
          })
        }

        changeAllChecked(this.allFunctionIds)
      },

      submenuClick (index1, index2, level2) {
        this.checkedIndex1 = index1
        this.checkedIndex2 = index2
        this.submenuCheckedFunctionId = level2.functionId
      }
    },
    created () {
      this.initData()
      this.handleCollapseOpenList()
    }
  }
</script>

<style scoped lang="scss">
  .content {
    height: 700px;
    &-left {
      width: 240px;
      &-menu {
        height: 100%;
        // overflow: scroll;
      }
      &-submenu:hover {
        background: rgba(41, 204, 177, 0.06);
      }
      &-submenu-checked {
        background: #d4f5f0;
      }
    }
    // &-right {
    // overflow: scroll;
    // }
  }
</style>

<style lang="scss">
  .character-submenu-level {
    .icon-right:before,
    .el-icon-arrow-right:before {
      content: "";
    }
    .el-collapse-item__wrap {
      display: none;
    }
    border-bottom: 1px solid #ebeef5;
  }
</style>
