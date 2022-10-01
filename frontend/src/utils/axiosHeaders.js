import authHeader from '../api/auth-header'

export const validHeader = (params) => ({
  headers: {
    ...authHeader()
  },
  params: params
})

export const multipartFileHeader = (params) => ({
  headers: {
    ...authHeader()
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
