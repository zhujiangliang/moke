<template>
  <div>
    <section>
      <h3>此组件适应多选，不在适用单选，所以必传multiple: true</h3>
      <div>* 新增参数 groupName：{ type: Array, required：no } 用于显示分组名</div>
      <div class="my-3">
        * 新增参数 caseSensitive：{ type: Boolean, required：no } 用于是否模糊搜索
      </div>
      <div>* 新增参数 selectNumberMethod：{ type: Function, required：no } 用于控制显示选择条数文案</div>
      <div>* 新增参数 isRemoveDuplication { type: Boolean, default: true } 用于去重和选中同一数据库保持联动(同一数据库处于不同项目组)</div>
    </section>
    <section class="my-3">
      <h3>不带搜索和组名, 不去重</h3>
      <app-cascader
        :options="options"
        :props="{ expandTrigger: 'hover',multiple: true }"
        :is-remove-duplication="false"></app-cascader>
    </section>
    <section>
      <h3>带搜索和组名，且有默认选中, 去重</h3>
      <app-cascader
        v-model="checkedValue"
        :options="options"
        :group-name="groupName"
        filterable
        clearable
        :props="{ expandTrigger: 'hover',multiple: true }"></app-cascader>
    </section>
  </div>
</template>

<script>
  import AppCascader from '@/components/AppCascader.vue'

  export default {
    name: '',
    components: { AppCascader },

    data () {
      return {
        groupName: ['一级标题', '二级标题'],
        options: [
          {
            value: 'A',
            label: 'A',
            children: [
              { value: 'A1', label: 'A1' },
              { value: 'A2', label: 'A2' },
              { value: 'B3', label: 'B3' },
              { value: 'B4', label: 'B4' }
            ]
          },
          {
            value: 'B',
            label: 'B',
            children: [
              { value: 'A1', label: 'A1' },
              { value: 'A2', label: 'A2' },
              { value: 'B3', label: 'B3' },
              { value: 'B4', label: 'B4' },
              { value: 'B5', label: 'B5' },
              { value: 'B6', label: 'B6' }
            ]
          }
        ],
        checkedValue: [['A', 'A1'], ['A', 'A2'], ['B', 'A1'], ['B', 'A2']]
      }
    },

    methods: {
      selectNumberMethod (count) {
        return '已经连续奋斗' + count + '天'
      }
    }
  }
</script>