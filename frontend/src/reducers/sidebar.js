import { SET_ASSESSMENT_NUMBERS, SET_EXPANDED } from '../actions/types'

const initialState = { isExpanded: true, assessments: 0 }

export default function getSidebarInfo(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_EXPANDED:
      return { ...state, isExpanded: payload }
    case SET_ASSESSMENT_NUMBERS:
      return { ...state, assessments: payload }
    default:
      return state
  }
}
