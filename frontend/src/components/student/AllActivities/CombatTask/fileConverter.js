export function getBase64(fileInput) {
  return new Promise((resolve) => {
    let file = fileInput.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result.toString())
    }
  })
}
