import { SET_EXPANDED } from '../actions/types'

const initialState = { isExpanded: true }

export default function getSidebarInfo(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_EXPANDED:
      return { ...state, isExpanded: payload }
    default:
      return state
  }
}
