import axios from 'axios'
import { errorToast } from './toasts'
import { validHeader, multipartFileHeader, fileHeaderWithParams } from './axiosHeaders'
import { getFormData } from './axiosHelper'

export function axiosApiPost(url, body) {
  return axios
    .post(url, body, validHeader({}))
    .then((response) => response.data)
    .catch((error) => {
      errorToast(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiGet(url, params, hideToast = false) {
  return axios
    .get(url, validHeader(params))
    .then((response) => response.data)
    .catch((error) => {
      if (!hideToast) {
        errorToast(error?.response?.data?.message)
      }
      throw error
    })
}

export function axiosApiPut(url, body) {
  return axios
    .put(url, body, validHeader({}))
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

export function axiosApiMultipartPost(url, body) {
  const formData = getFormData(body)

  return axios
    .post(url, formData, multipartFileHeader({}))
    .then((response) => response.data)
    .catch((error) => {
      errorToast(error?.response?.data?.message)
      throw error
    })
}

export function axiosApiMultipartPut(url, body) {
  const formData = getFormData(body)

  return axios
    .put(url, formData, multipartFileHeader({}))
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
