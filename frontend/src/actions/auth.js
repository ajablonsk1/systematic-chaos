import AuthService from '../services/auth.service'
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_MESSAGE } from './types'
import { GeneralRoutes } from '../routes/PageRoutes'

const message = (error) =>
  (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

export const register = (values) => (dispatch) => {
  return AuthService.register(values)
    .then((response) => {
      if (response) {
        dispatch({ type: REGISTER_SUCCESS })
        dispatch({ type: SET_MESSAGE, payload: response.data.message })
        dispatch(login(values))

        return Promise.resolve()
      }
    })
    .catch((err) => {
      const msg = message(err.response.data.message)
      dispatch({
        type: SET_MESSAGE,
        payload: msg
      })
      dispatch({
        type: REGISTER_FAIL
      })
      return Promise.reject()
    })
}

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password)
    .then((data) => {
      if (data) {
        dispatch({ type: LOGIN_SUCCESS, payload: { user: data } })
        return Promise.resolve()
      } else {
        const msg = message('Login Fail')
        dispatch({ type: LOGIN_FAIL })
        dispatch({ type: SET_MESSAGE, payload: msg })
        return Promise.reject()
      }
    })
    .catch((err) => {
      throw err
    })
}

export const logout = (navigate) => (dispatch) => {
  AuthService.logout()
  dispatch({ type: LOGOUT })
  navigate(GeneralRoutes.HOME)
}
