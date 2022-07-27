export function getBase64(fileInput) {
  return new Promise((resolve) => {
    let file = fileInput.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      resolve(reader.result.toString().split('base64,')[1])
    }
  })
}

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return window.URL.createObjectURL(new Blob(byteArrays, { type: contentType }))
}
