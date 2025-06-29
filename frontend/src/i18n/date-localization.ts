export const dateLocalizationPL = {
  labelMonths: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ],
  labelWeekdays: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
  firstDayOfWeek: 1,
  monthLabelFormat: 'MMMM YYYY',
}

export const dateLocalizationEN = {
  labelMonths: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  labelWeekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  firstDayOfWeek: 0,
  monthLabelFormat: 'MMMM YYYY',
}

export const getDateLocalization = (lang: string) => {
  switch (lang) {
    case 'pl':
      return dateLocalizationPL
    case 'en':
    default:
      return dateLocalizationEN
  }
}
