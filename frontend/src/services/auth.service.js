import axios from 'axios'
import QueryString from 'qs'
import { AccountType } from '../utils/userRole'
import { GET_TOKEN_REFRESH, POST_LOGIN, POST_REGISTER, PUT_PASSWORD_EDITION } from './urls'
import { axiosApiPut } from '../utils/axios'

class AuthService {
  login({ email, password }) {
    return axios
      .post(POST_LOGIN, QueryString.stringify({ email: email, password: password }), {
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

  register({ firstName, lastName, email, password, accountType, heroType, index, token }) {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      accountType: accountType
    }

    if (accountType === AccountType.STUDENT) {
      body.invitationCode = token
      body.heroType = heroType
      body.indexNumber = +index
    } else if (accountType === AccountType.PROFESSOR) {
      body.professorRegistrationToken = token
    }

    return axios
      .post(POST_REGISTER, body, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
      .catch((err) => {
        throw err
      })
  }

  refreshToken(refreshToken) {
    return axios
      .get(GET_TOKEN_REFRESH, {
        headers: { Authorization: 'Bearer ' + refreshToken }
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
      })
      .catch((err) => {
        throw err
      })
  }

  editPassword(newPassword) {
    return axiosApiPut(PUT_PASSWORD_EDITION, { newPassword: newPassword }).catch((error) => {
      throw error
    })
  }
}

export default new AuthService()
