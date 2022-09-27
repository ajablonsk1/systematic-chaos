import { combineReducers } from 'redux'
import auth from './auth'
import message from './message'
import sidebar from './sidebar'

export default combineReducers({
  auth,
  message,
  sidebar
})
