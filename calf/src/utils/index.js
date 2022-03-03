// 获取浏览器的默认语言
const browserLanguageMap = {
  'en-us': 'en_US',
  'zh-cn': 'zh_CN'
}

export function getBrowserDefaultLanguage() {
  // 不支持的浏览器语言显示中文
  return browserLanguageMap[(navigator.language || navigator.browserLanguage).toLowerCase()] || 'zh_CN'
}
