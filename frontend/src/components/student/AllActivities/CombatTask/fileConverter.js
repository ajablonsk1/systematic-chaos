export function getBase64(fileInput) {
  return new Promise((resolve) => {
    let file = fileInput.files[0]
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      const test = new Blob([new Uint8Array(reader.result)], { type: file.type })
      console.log(test)
      resolve(test)
    }
  })
}
