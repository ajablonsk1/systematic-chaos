import { axiosApiDelete, axiosApiGet, axiosApiMultipartPost, axiosApiMultipartPut } from '../utils/axios'
import { parseJwt } from '../utils/Api'
import {
  ADD_BADGE,
  DELETE_BADGE,
  GET_BADGE_ALL,
  GET_BADGE_UNLOCKED_ALL,
  GET_USER_CURRENT,
  PUT_BADGE_UPDATE
} from './urls'

class UserService {
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getEmail() {
    return parseJwt(this.getUser().access_token).sub
  }

  getUserData() {
    return axiosApiGet(GET_USER_CURRENT).catch((error) => {
      throw error
    })
  }

  getAllBadges() {
    return axiosApiGet(GET_BADGE_ALL).catch((error) => {
      throw error
    })
  }

  getUnlockedBadges() {
    return axiosApiGet(GET_BADGE_UNLOCKED_ALL).catch((error) => {
      throw error
    })
  }

  deleteBadge(badgeId) {
    return axiosApiDelete(DELETE_BADGE, { badgeId }).catch((error) => {
      throw error
    })
  }

  addBadge(title, description, image, value, forGroup, type) {
    return axiosApiMultipartPost(ADD_BADGE, {
      title,
      description,
      image,
      value,
      forGroup,
      type
    }).catch((error) => {
      throw error
    })
  }

  editBadge(title, description, image, value, forGroup, id) {
    return axiosApiMultipartPut(PUT_BADGE_UPDATE, {
      title,
      description,
      image,
      value,
      forGroup,
      id
    }).catch((error) => {
      throw error
    })
  }
}

export default new UserService()
