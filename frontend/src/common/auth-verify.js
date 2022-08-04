import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils/Api'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { refreshSessionToast } from '../utils/toasts'

function AuthVerify(props) {
  const navigate = useNavigate()
  let pathname = window.location.pathname

  useEffect(() => {
    if (props.user && !JSON.parse(localStorage.getItem('user'))) {
      props.dispatch(logout(navigate))
    } else if (props.user) {
      const decodedJwt = parseJwt(props.user.access_token)

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.dispatch(logout(navigate))
      } else if (decodedJwt.exp * 1000 < Date.now() + 15 * 60 * 1000) {
        refreshSessionToast(props.user, props.dispatch, navigate)
      }
    }
  }, [navigate, props, pathname])

  // when one tab is logged out, log out all tabs with application
  useEffect(() => {
    const handleInvalidUser = (event) => {
      if (event.key === 'user' && event.oldValue && !event.newValue) {
        props.dispatch(logout(navigate))
      }
    }

    window.addEventListener('storage', (event) => handleInvalidUser(event))
    return () => window.removeEventListener('storage', (event) => handleInvalidUser(event))
  })

  return <div />
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth
  return {
    isLoggedIn,
    user
  }
}
export default connect(mapStateToProps)(AuthVerify)
