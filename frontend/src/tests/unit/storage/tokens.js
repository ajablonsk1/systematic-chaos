export const testStudentTokens = [
  {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZ29yc2tpQHN0dWRlbnQuYWdoLmVkdS5wbCIsInJvbGVzIjpbIlNUVURFTlQiXSwiaXNzIjoiL2FwaS9sb2dpbiIsImV4cCI6MTY2NTMzNjQ4N30.JocsYBm7M_zj84WDsZh5TaM_pxCK9GFwCBre3gj6iTU',
    token_data: {
      sub: 'jgorski@student.agh.edu.pl',
      roles: ['STUDENT'],
      iss: '/api/login',
      exp: 1665336487
    }
  },
  {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdXJiYW5za2FAc3R1ZGVudC5hZ2guZWR1LnBsIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpc3MiOiIvYXBpL2xvZ2luIiwiZXhwIjoxNjY1MzM2NTU1fQ.rZOYxDKFmMwRYw_BXulP_l1sFS4KfuBoSL3610Gw7XY',
    token_data: {
      sub: 'murbanska@student.agh.edu.pl',
      roles: ['STUDENT'],
      iss: '/api/login',
      exp: 1665336555
    }
  },
  {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJra3J1a0BzdHVkZW50LmFnaC5lZHUucGwiLCJyb2xlcyI6WyJTVFVERU5UIl0sImlzcyI6Ii9hcGkvbG9naW4iLCJleHAiOjE2NjUzMzY2MDZ9.QCSN8Nga6-tCZozbGCvkb4E_hbkE8nk_qy1wRs_MOtA',
    token_data: {
      sub: 'kkruk@student.agh.edu.pl',
      roles: ['STUDENT'],
      iss: '/api/login',
      exp: 1665336606
    }
  },
  {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzbWF6dXJAc3R1ZGVudC5hZ2guZWR1LnBsIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpc3MiOiIvYXBpL2xvZ2luIiwiZXhwIjoxNjY1MzM2Njk1fQ.V9NOj0uHq8YMn66PUrWdMDFvyW2n_H2IbavGcwLVbv0',
    token_data: {
      sub: 'smazur@student.agh.edu.pl',
      roles: ['STUDENT'],
      iss: '/api/login',
      exp: 1665336695
    }
  }
]
export const testProfessorTokens = [
  {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJibWFqQGFnaC5lZHUucGwiLCJyb2xlcyI6WyJQUk9GRVNTT1IiXSwiaXNzIjoiL2FwaS9sb2dpbiIsImV4cCI6MTY2NTMzNzA3NX0.M5sSb6c2hUw5Pfu1h1dZ8tnB7S3ESV8s2P0oAkX2zcI',
    token_data: {
      exp: 1665337075,
      iss: '/api/login',
      roles: ['PROFESSOR'],
      sub: 'bmaj@agh.edu.pl'
    }
  },
  {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzemllbGluc2tpQGFnaC5lZHUucGwiLCJyb2xlcyI6WyJQUk9GRVNTT1IiXSwiaXNzIjoiL2FwaS9sb2dpbiIsImV4cCI6MTY2NTMzNzExNX0.ZKcLZ2ARHtA5Q1TulX9ow0C5KGnV0KxILC8VvJ4P2sk',
    token_data: {
      exp: 1665337115,
      iss: '/api/login',
      roles: ['PROFESSOR'],
      sub: 'szielinski@agh.edu.pl'
    }
  }
]
export const testInvalidTokens = [
  { access_token: '' },
  { access_token: 'incorrectToken' },
  { access_token: '111111111111111111111111111111111111111111111111111' }
]
