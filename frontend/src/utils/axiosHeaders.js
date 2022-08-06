import authHeader from '../services/auth-header'

export const validHeader = (params) => ({
  headers: {
    ...authHeader()
  },
  params: params
})

export const multipartFileHeader = (params) => ({
  headers: {
    ...authHeader(),
    'Content-Type': 'multipart/form-data'
  },
  params: params
})

export const fileHeaderWithParams = (params) => ({
  headers: {
    ...authHeader()
  },
  responseType: 'blob',
  params: params
})
