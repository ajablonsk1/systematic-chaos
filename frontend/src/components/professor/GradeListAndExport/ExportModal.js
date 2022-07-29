import React, { useState } from 'react'
import { Button, Card, Modal, Spinner } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import ProfessorService from '../../../services/professor.service'
import download from 'downloadjs'
import moment from 'moment'

function ExportModal(props) {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState()

  const startExporting = () => {
    setIsFetching(true)
    ProfessorService.getCSVGradesFile(props.data)
      .then((response) => {
        const date = moment(new Date()).format('DD-MM-YYYY')
        download(response, `oceny_sc_${date}.csv`, 'text/csv')
        props.setModalVisible(false)
        setIsFetching(false)
      })
      .catch((error) => {
        setError(error)
        setIsFetching(false)
      })
  }

  return (
    <Modal show={props.isModalVisible}>
      <Card>
        <CardHeader className={'text-center'}>
          <Card.Title>Eksport ocen.</Card.Title>
          <p>Czy na pewno chcesz rozpocząć eksport ocen dla wybranych studentów?</p>
        </CardHeader>
        <Card.Footer className={'text-center'}>
          {isFetching ? (
            <Spinner animation={'border'} />
          ) : error ? (
            <p className={'text-danger font-weight-bold'}>{error}</p>
          ) : (
            <>
              <Button variant={'danger'} onClick={() => props.setModalVisible(false)}>
                Anuluj
              </Button>
              <Button variant={'success'} className={'ml-2'} onClick={startExporting}>
                Eksportuj
              </Button>
            </>
          )}
        </Card.Footer>
      </Card>
    </Modal>
  )
}

export default ExportModal
