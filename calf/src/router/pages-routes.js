import getModuleRouters from './methods/get-module-routes'

const context = require.context('../pages', true, /-router.js$/)
// console.log('111', getModuleRouters('./', context))
export default getModuleRouters('./', context)
