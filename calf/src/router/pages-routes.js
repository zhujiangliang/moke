import getModuleRouters from './get-module-routes'

const context = require.context('../pages', true, /-router.js$/)

export default getModuleRouters('./', context)
