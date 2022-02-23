const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  // baseUrl: './','
  // lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))

    // 在 svg 规则中排除我们的图标库文件夹目录
    config.module.rule('svg').exclude.add(resolve('src/assets/icons/svg')).end()
    // 创建 icons 规则，设置文件夹包含我们的图标库文件夹目录
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [{ removeXMLNS: true }]
      })
      .end()
  }
}
