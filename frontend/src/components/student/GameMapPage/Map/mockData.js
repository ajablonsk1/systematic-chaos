import moment from 'moment'

export const getRequirements = () => [
  {
    name: 'Data zamknięcia aktywności',
    value: moment(Date.now()).add(2, 'days').format('DD.MM.YYYY, HH:mm')
  },
  {
    name: 'Liczba punktów',
    value: 700
  },
  {
    name: 'Postęp w rozdziale (%)',
    value: 55
  },
  {
    name: 'Liczba wykonanych aktywności',
    value: 8
  }
]
