
import { createI18n } from 'vue-i18n'
export const i18n = createI18n({
  locale: 'cn',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        title: 'test'
      }
    },
    ja: {
      message: {
        title: 'イベント発見'
      }
    }
  }
})