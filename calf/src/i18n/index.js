import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
import { getBrowserDefaultLanguage } from '@/utils'

Vue.use(VueI18n)

function getPath(matchedPath) {
  return matchedPath[1].replace(/-(\w)?/g, function (val, $1) {
    return $1 ? $1.toUpperCase() : ''
  })
}

function loadLocaleMessages() {
  const locales = require.context('./langs', true, /[A-Za-z0-9-_,\s]+\.(json|js)$/i)
  const messages = {
    en_US: enLocale,
    zh_CN: zhLocale
  }

  locales.keys().forEach((key) => {
    const isJsFiles = /.js$/g.test(key)
    const localeConfigObj = isJsFiles ? locales(key).default : locales(key)

    if (key.split('/').length > 2) {
      const matchedLocale = key.match(/([A-Za-z0-9-_]+)\//i)
      const matchedPath = key.match(/([A-Za-z0-9-_]+)\./i)
      if (matchedLocale && matchedPath) {
        const locale = matchedLocale[1]
        const path = getPath(matchedPath)
        if (messages[locale][path]) {
          messages[locale][path] = { ...messages[locale][path], ...localeConfigObj }
        } else {
          messages[locale][path] = { ...localeConfigObj }
        }
      }
    } else {
      const matchedPath = key.match(/([A-Za-z0-9-_]+)\./i)
      if (matchedPath && matchedPath.length > 1) {
        const locale = matchedPath[1]
        messages[locale] = { ...messages[locale], ...localeConfigObj }
      }
    }
  })
  return messages
}

const i18n = new VueI18n({
  locale: localStorage.getItem('language') || getBrowserDefaultLanguage() || process.env.VUE_APP_I18N_LOCALE || 'zh_CN', // // 如果没有缓存的用户语言信息，用浏览器默认语言
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh_CN',
  messages: loadLocaleMessages()
})

// element-ui 本地化配置
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
