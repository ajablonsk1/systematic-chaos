export const testEndDates = [
  {
    date: '2022-05-14T12:00:00.000Z',
    remainingDays: 1,
    expectedStringInfo: '1 dni, 00 godz, 00 min'
  },
  {
    date: '2022-05-13T12:00:00.000Z',
    remainingDays: 0,
    expectedStringInfo: '0 dni, 00 godz, 00 min'
  },
  {
    date: '2022-05-12T12:00:00.000Z',
    remainingDays: -1,
    expectedStringInfo: '-1 dni, 00 godz, 00 min'
  },
  {
    date: '2022-07-15T13:50:00.000Z',
    remainingDays: 63.076388888888886,
    expectedStringInfo: '63 dni, 01 godz, 50 min'
  },
  {
    date: '2022-05-13T12:00:00.001Z',
    remainingDays: 1.1574074074074074e-8,
    expectedStringInfo: '0 dni, 00 godz, 00 min'
  }
]
