function noNestedRoutesHandler(childRoutes) {
  if (!childRoutes.length) {
    return []
  }

  let noNestedRoutes = []

  for (let index = 0; index < childRoutes.length; index++) {
    const router = childRoutes[index]

    if (router.meta?.noNested) {
      noNestedRoutes = noNestedRoutes.concat(childRoutes.splice(index, 1))
      index--
    }
  }

  return noNestedRoutes
}

/**
 * 获取一个模块下面所有路由配置的工具方法, 模块路由配置信息在**-router.js文件里面
 * @param {*} modulePath context.keys() 得到的数组里面最上层的模块路径，一般为.
 * @param {*} context    require.context() 返回值
 */
function getModuleRoutes(modulePath, context) {
  const childModules = []
  let routes = []
  let childRoutes = []
  let rootModule = ''
  let rootModuleCount = 0 // 用于判断一个模块下是否只包含一个*-router.js文件

  context
    .keys()
    .sort((a, b) => a.split('/').length - b.split('/').length)
    .filter((item) => item.indexOf(modulePath) !== -1)
    .forEach((filePath) => {
      const folderPath = filePath.slice(0, filePath.lastIndexOf('/') + 1)

      if (folderPath === modulePath) {
        rootModuleCount++
        rootModule = filePath
      } else {
        const isChildModule = childModules.filter((item) => filePath.includes(item)).length === 0

        isChildModule && childModules.push(folderPath)
      }
    })

  childModules.forEach((childModule) => {
    childRoutes = childRoutes.concat(getModuleRoutes(childModule, context))
  })

  if (rootModuleCount > 1) {
    throw new Error('one module just need only one router config file')
  } else if (rootModuleCount === 0) {
    routes = childRoutes
  } else {
    const rootRouter = context(rootModule).default || context(rootModule)
    const noNestedRoutes = noNestedRoutesHandler(childRoutes)

    routes = [{ ...rootRouter, children: childRoutes }, ...noNestedRoutes]
  }

  return routes
}

export default getModuleRoutes
