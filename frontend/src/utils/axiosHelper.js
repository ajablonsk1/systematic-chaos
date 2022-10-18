export const getFormData = (body) => {
  if (!body || !isCorrectBody(body)) {
    return
  }

  const formData = new FormData()
  Object.keys(body).forEach((key) => {
    if (body[key]) {
      formData.append(key, body[key])
    }
  })
  return formData
}

export const isCorrectBody = (a) => !!a && (a.constructor === Array || a.constructor === Object)
