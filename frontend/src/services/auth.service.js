import axios from 'axios'
import QueryString from 'qs'
import { AccountType } from '../utils/userRole'
import { BASE_URL } from './urls'

class AuthService {
  login({ email, password }) {
    return axios
      .post(BASE_URL + 'login', QueryString.stringify({ email: email, password: password }), {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
      .catch((err) => {
        throw err
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register({ firstName, lastName, email, password, invitationCode, accountType, heroType, index }) {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      accountType: accountType
    }

    if (accountType === AccountType.STUDENT) {
      body.invitationCode = invitationCode
      body.heroType = heroType
      body.indexNumber = +index
    }

    return axios
      .post(BASE_URL + 'register', body, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
      .catch((err) => {
        throw err
      })
  }

  refreshToken(refreshToken) {
    return axios
      .get(BASE_URL + 'token/refresh', {
        headers: { Authorization: 'Bearer ' + refreshToken }
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
      })
      .catch((err) => {
        throw err
      })
  }
}

export default new AuthService()
