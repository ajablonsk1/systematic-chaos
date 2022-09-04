import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isStudent } from '../../../utils/storageManager'
import { Role } from '../../../utils/userRole'
import { GeneralRoutes, StudentRoutes, TeacherRoutes } from '../../../routes/PageRoutes'

function PageGuard(props) {
  const navigate = useNavigate()
  const isLoggedIn = props.isLoggedIn
  const student = isStudent(props.user)
  const role = props.role
  const child = props.children

  useEffect(() => {
    if (!isLoggedIn && role !== Role.NOT_LOGGED_IN) {
      navigate(GeneralRoutes.HOME)
      window.location.reload(true) // without it, sidebar not reload after redirect
    } else {
      if ((role === Role.LOGGED_IN_AS_STUDENT || (role === Role.NOT_LOGGED_IN && isLoggedIn)) && !student) {
        navigate(TeacherRoutes.GAME_SUMMARY)
        window.location.reload(true) // without it, sidebar not reload after redirect
      } else if ((role === Role.LOGGED_IN_AS_TEACHER || (role === Role.NOT_LOGGED_IN && isLoggedIn)) && student) {
        navigate(StudentRoutes.GAME_CARD)
        window.location.reload(true) // without it, sidebar not reload after redirect
      }
    }
  }, [navigate, role, isLoggedIn, student])

  return <>{child}</>
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth
  return {
    isLoggedIn,
    user
  }
}
export default connect(mapStateToProps)(PageGuard)
