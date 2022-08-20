export function ActivityAssessmentProfessorFileService({ setFile, setFileName, fileRef }) {
  const saveFile = (event) => {
    const filename = event.target.value.split(/(\\|\/)/g).pop()
    setFileName(filename)
    setFile(event.target.files[0])
  }

  return (
    <>
      <strong>Plik uwag:</strong>
      <input ref={fileRef} type='file' className='m-auto' onChange={saveFile} />
    </>
  )
}
