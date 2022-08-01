import axios from 'axios'
import authHeader from '../services/auth-header'
import { toasts } from './toasts'

const header = Object.assign(authHeader(), { 'Content-Type': 'application/x-www-form-urlencoded' })
const headerWithParams = (params) => Object.assign(header, { params })
const multipartFileHeader = Object.assign(authHeader(), { 'Content-Type': 'multipart/form-data' })
const fileHeaderWithParams = (params) => Object.assign(header, { responseType: 'blob', params })

export function axiosApiPost(url, body) {
  return axios
    .post(url, body, header)
    .then((response) => response.data)
    .catch((error) => {
      toasts(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiGet(url, params) {
  return axios
    .get(url, headerWithParams(params))
    .then((response) => response.data)
    .catch((error) => {
      toasts(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiDelete(url, params) {
  return axios
    .delete(url, headerWithParams(params))
    .then((response) => response.data)
    .catch((error) => {
      toasts(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiSendFile(url, body) {
  const formData = new FormData()
  formData.append('fileTaskId', body.fileTaskId)
  formData.append('studentEmail', body.studentEmail)

  if (body.openAnswer) {
    formData.append('openAnswer', body.openAnswer)
  }
  if (body.file && body.fileName) {
    formData.append('file', body.file)
    formData.append('fileName', body.fileName)
  }

  return axios
    .post(url, formData, multipartFileHeader)
    .then((response) => response.data)
    .catch((error) => {
      toasts(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiDownloadFile(url, params) {
  return axios
    .get(url, fileHeaderWithParams(params))
    .then((response) => response.data)
    .catch((error) => {
      toasts(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiGetFile(url, body) {
  return axios
    .post(url, body, Object.assign(header, { responseType: 'blob' }))
    .then((response) => response.data)
    .catch((error) => {
      toasts(error?.response?.data?.message)
      throw error
    })
}
