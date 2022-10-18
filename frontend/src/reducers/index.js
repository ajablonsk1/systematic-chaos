import { combineReducers } from 'redux'
import auth from './auth'
import message from './message'
import sidebar from './sidebar'
import theme from './theme'

export default combineReducers({
  auth,
  message,
  sidebar,
  theme
})
