import store from '../store'

/**
 * 权限校验指令 如果没有对应权限移除元素
 * 用法 v-permission="权限名或者权限数组"
 * 建议使用：v-if="$permissionCheck('value')"
 */
function permissionCheck(value) {
  let hasPermission = false

  if (typeof value === 'string') {
    hasPermission = store.state.userInfo.permissionList.includes(value)
  } else if (value instanceof Array) {
    value.forEach((item) => {
      if (store.state.userInfo.permissionList.includes(item)) {
        hasPermission = true
      }
    })
  }

  return hasPermission
}

const permission = {
  install: (Vue) => {
    Vue.directive('permission', {
      bind: function (el, binding) {
        let className = el.getAttribute('class')

        className = className.concat(' hidden')
        el.setAttribute('class', className)
        if (permissionCheck(binding.value)) {
          className = className.replace('hidden', '')
          el.setAttribute('class', className)
        }
      },
      inserted: function (el, binding) {
        if (!permissionCheck(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$permissionCheck', { value: permissionCheck })
  }
}

export default permission
