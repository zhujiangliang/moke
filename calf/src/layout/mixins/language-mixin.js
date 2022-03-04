export default {
  computed: {
    language() {
      let lang = ''
      this.languageOptions.forEach((item) => {
        if (item.value === this.$i18n.locale) lang = item.label
      })
      return lang
    },

    languageOptions() {
      return [
        {
          label: '简体中文',
          value: 'zh_CN'
        },
        {
          label: 'English',
          value: 'en_US'
        }
      ]
    }
  }
}
