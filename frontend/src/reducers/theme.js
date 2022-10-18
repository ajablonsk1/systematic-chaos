import {
  SET_BACKGROUND_COLOR,
  SET_DANGER_COLOR,
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_SUCCESS_COLOR,
  SET_WARNING_COLOR
} from '../actions/types'

const initialState = {
  primary: '#001542',
  secondary: '#223762',
  background: '#FFFBFF',
  warning: '#FFB30D',
  danger: '#FF4000',
  success: '#085454',
  font: '#FFB30D'
}

export default function getTheme(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_PRIMARY_COLOR:
      return { ...state, primary: payload }
    case SET_SECONDARY_COLOR:
      return { ...state, secondary: payload }
    case SET_BACKGROUND_COLOR:
      return { ...state, background: payload }
    case SET_WARNING_COLOR:
      return { ...state, warning: payload }
    case SET_DANGER_COLOR:
      return { ...state, danger: payload }
    case SET_SUCCESS_COLOR:
      return { ...state, success: payload }
    default:
      return state
  }
}
