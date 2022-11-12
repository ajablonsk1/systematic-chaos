import { useCallback, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import download from 'downloadjs'
import { ActivityFileName } from '../../../../utils/constants'

function FileUpload(props) {
  const [fileUploadMessage, setFileUploadMessage] = useState(undefined)

  const uploadInputRef = useRef()

  const downloadJson = () => {
    if (props.jsonToDownload) {
      const jsonDataBase = 'data:text/json;charset=utf-8,'
      const jsonData = jsonDataBase + encodeURIComponent(JSON.stringify(props.jsonToDownload, null, 4))
      download(jsonData, ActivityFileName[props.activityType])
    }
  }

  const uploadJsonFile = (event) => {
    let reader = new FileReader()
    reader.onload = (event) => {
      props.setPlaceholderJson(JSON.parse(event.target.result))
      setFileUploadMessage('Plik został dodany pomyślnie. Możesz to sprawdzić w edytorze online.')
    }
    reader.readAsText(event.target.files[0])
  }

  const removeInputFile = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.value = ''
      setFileUploadMessage(undefined)
    }
  }

  const Icon = useCallback((onClick, icon) => {
    return (
      <FontAwesomeIcon className={'ms-4'} icon={icon} onClick={onClick} size={'lg'} style={{ cursor: 'pointer' }} />
    )
  }, [])

  return (
    <>
      <p className={'text-center mt-4'}>
        Jeżeli nie chcesz korzystać z JSON edytora online, możesz pobrać plik z jego zawartością i edytować go poza
        naszym edytorem, a następnie załączyć wyedytowany plik.
      </p>

      <Form.Group className={'mt-4'}>
        <Form.Label className={'fw-bold'} style={{ width: 210 }}>
          Pobierz plik konfiguracyjny
        </Form.Label>
        {Icon(downloadJson, faDownload)}
      </Form.Group>

      <Form.Group className='my-4'>
        <div className={'fw-bold w-100'}>
          <Form.Label style={{ width: 210 }}>Załącz wyedytowany plik</Form.Label>
          {Icon(removeInputFile, faTrash)}
        </div>
        <input ref={uploadInputRef} type={'file'} accept={'application/json'} onChange={uploadJsonFile} />
      </Form.Group>

      <p>{fileUploadMessage}</p>
    </>
  )
}

export default FileUpload
