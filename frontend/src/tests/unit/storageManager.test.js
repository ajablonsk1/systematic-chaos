import { getTimer, isStudent } from '../../utils/storageManager'

const timeCases = [
  { timeGiven: 1, timeExpected: '00:00:01' },
  { timeGiven: 100, timeExpected: '00:01:40' },
  { timeGiven: 0, timeExpected: '00:00:00' },
  { timeGiven: 3600, timeExpected: '01:00:00' },
  //maximum time we can show using this function
  { timeGiven: 86399, timeExpected: '23:59:59' },
  //times longer than 23:59:59 hours are cut off - the days moved to the left are not included in the result
  { timeGiven: 9999999, timeExpected: '17:46:39' }
]

describe('timer tests', () => {
  it.each(timeCases)('Returns correct remaining time for %s', ({ timeGiven, timeExpected }) => {
    //when
    const remainingTime = getTimer(timeGiven)

    expect(remainingTime).toBe(timeExpected)
  })
})
