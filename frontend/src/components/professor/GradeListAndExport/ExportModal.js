import React, { useState, useEffect } from 'react'
import { Button, Card, Modal, Spinner } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import ProfessorService from '../../../services/professor.service'
import download from 'downloadjs'
import moment from 'moment'
import ActivitiesTable from './ActivitiesTable'

function ExportModal(props) {
  const [exportButtonDisabled, setExportButtonDisabled] = useState(true)
  const [activitiesToExportIds, setActivitiesToExportIds] = useState([])

  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setExportButtonDisabled(activitiesToExportIds.length === 0)
  }, [activitiesToExportIds])

  const startExporting = () => {
    setIsFetching(true)
    ProfessorService.getCSVGradesFile(props.data, activitiesToExportIds)
      .then((response) => {
        const date = moment(new Date()).format('DD-MM-YYYY')
        download(response, `oceny_sc_${date}.csv`, 'text/csv')
        props.setModalVisible(false)
        setIsFetching(false)
      })
      .catch(() => {
        setIsFetching(false)
      })
  }

  return (
    <Modal show={props.isModalVisible} size={'lg'}>
      <Card>
        <CardHeader className={'text-center'}>
          <Card.Title>Wybór aktywności.</Card.Title>
          <p>Wybierz dla jakich aktywności chcesz dokonać eksportu ocen.</p>
        </CardHeader>
        <Card.Body>
          <ActivitiesTable
            setExportButtonDisabled={setExportButtonDisabled}
            activitiesToExportIds={activitiesToExportIds}
            setActivitiesToExportIds={setActivitiesToExportIds}
          />
        </Card.Body>
        <Card.Footer className={'text-center'}>
          {isFetching ? (
            <Spinner animation={'border'} />
          ) : (
            <>
              <Button variant={'danger'} onClick={() => props.setModalVisible(false)}>
                Anuluj
              </Button>
              <Button variant={'success'} className={'ml-2'} onClick={startExporting} disabled={exportButtonDisabled}>
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
