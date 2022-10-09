import { getTimer, isStudent } from '../../utils/storageManager'

describe('timer tests', () => {
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

  it.each(timeCases)('Returns correct remaining time for %s', ({ timeGiven, timeExpected }) => {
    //when
    const remainingTime = getTimer(timeGiven)

    //then
    expect(remainingTime).toBe(timeExpected)
  })
})

describe('isStudent tests', () => {
  const studentTokens = [
    {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZ29yc2tpQHN0dWRlbnQuYWdoLmVkdS5wbCIsInJvbGVzIjpbIlNUVURFTlQiXSwiaXNzIjoiL2FwaS9sb2dpbiIsImV4cCI6MTY2NTMzNjQ4N30.JocsYBm7M_zj84WDsZh5TaM_pxCK9GFwCBre3gj6iTU'
    },
    {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdXJiYW5za2FAc3R1ZGVudC5hZ2guZWR1LnBsIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpc3MiOiIvYXBpL2xvZ2luIiwiZXhwIjoxNjY1MzM2NTU1fQ.rZOYxDKFmMwRYw_BXulP_l1sFS4KfuBoSL3610Gw7XY'
    },
    {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJra3J1a0BzdHVkZW50LmFnaC5lZHUucGwiLCJyb2xlcyI6WyJTVFVERU5UIl0sImlzcyI6Ii9hcGkvbG9naW4iLCJleHAiOjE2NjUzMzY2MDZ9.QCSN8Nga6-tCZozbGCvkb4E_hbkE8nk_qy1wRs_MOtA'
    },
    {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWF6dXJAc3R1ZGVudC5hZ2guZWR1LnBsIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpc3MiOiIvYXBpL2xvZ2luIiwiZXhwIjoxNjY1MzM2Njk1fQ.V9NOj0uHq8YMn66PUrWdMDFvyW2n_H2IbavGcwLVbv0'
    }
  ]
  const professorTokens = [
    {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJibWFqQGFnaC5lZHUucGwiLCJyb2xlcyI6WyJQUk9GRVNTT1IiXSwiaXNzIjoiL2FwaS9sb2dpbiIsImV4cCI6MTY2NTMzNzA3NX0.M5sSb6c2hUw5Pfu1h1dZ8tnB7S3ESV8s2P0oAkX2zcI'
    },
    {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzemllbGluc2tpQGFnaC5lZHUucGwiLCJyb2xlcyI6WyJQUk9GRVNTT1IiXSwiaXNzIjoiL2FwaS9sb2dpbiIsImV4cCI6MTY2NTMzNzExNX0.ZKcLZ2ARHtA5Q1TulX9ow0C5KGnV0KxILC8VvJ4P2sk'
    }
  ]
  const invalidTokens = [
    { access_token: '' },
    { access_token: 'incorrectToken' },
    { access_token: '1111111111111111111111111111111111111111111111111111' }
  ]

  it.each(studentTokens)('Returns true for a student account with token %s', (token) => {
    //when
    const isStudentAccount = isStudent(token)

    //then
    expect(isStudentAccount).toBeTruthy()
  })
  it.each(professorTokens)('Returns false for a professor account with token %s', (token) => {
    //when
    const isStudentAccount = isStudent(token)

    //then
    expect(isStudentAccount).toBeFalsy()
  })
  it.each(invalidTokens)('Throws a TypeError for an invalid token %s', (token) => {
    //when
    const anonymousIsStudent = () => {
      isStudent(token)
    }

    //then
    expect(anonymousIsStudent).toThrow(TypeError)
  })
})
