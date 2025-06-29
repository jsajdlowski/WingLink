import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import 'dayjs/locale/en'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import i18n from './i18n'

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

i18n.on('languageChanged', (lng) => {
  dayjs.locale(lng)
})

dayjs.locale(i18n.language)

export { dayjs }
