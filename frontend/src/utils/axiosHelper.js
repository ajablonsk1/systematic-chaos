export const getFormData = (body) => {
  const formData = new FormData()
  Object.keys(body).forEach((key) => {
    if (body[key]) {
      formData.append(key, body[key])
    }
  })
  return formData
}
