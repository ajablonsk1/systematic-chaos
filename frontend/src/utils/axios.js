import axios from 'axios'
import { errorToast } from './toasts'
import { validHeader, multipartFileHeader, fileHeaderWithParams } from './axiosHeaders'

export function axiosApiPost(url, body) {
  return axios
    .post(url, body, validHeader({}))
    .then((response) => response.data)
    .catch((error) => {
      errorToast(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiGet(url, params) {
  return axios
    .get(url, validHeader(params))
    .then((response) => response.data)
    .catch((error) => {
      errorToast(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiDelete(url, params) {
  return axios
    .delete(url, validHeader(params))
    .then((response) => response.data)
    .catch((error) => {
      errorToast(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiSendFile(url, body) {
  const formData = new FormData()
  Object.keys(body).forEach((key) => {
    if (body[key]) {
      formData.append(key, body[key])
    }
  })

  return axios
    .post(url, formData, multipartFileHeader({}))
    .then((response) => response.data)
    .catch((error) => {
      errorToast(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiDownloadFile(url, params) {
  return axios
    .get(url, fileHeaderWithParams(params))
    .then((response) => response.data)
    .catch((error) => {
      errorToast(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiGetFile(url, body) {
  return axios
    .post(url, body, fileHeaderWithParams({}))
    .then((response) => response.data)
    .catch((error) => {
      errorToast(error?.response?.data?.message)
      throw error
    })
}
