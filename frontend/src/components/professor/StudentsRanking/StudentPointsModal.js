import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import LastPointsTable from '../../student/PointsPage/Tables/LastPointsTable'
import ProfessorService from '../../../api/services/professor.service'

function StudentPointsModal(props) {
  const [studentPoints, setStudentPoints] = useState(undefined)

  useEffect(() => {
    if (props.show) {
      ProfessorService.getStudentPointsList(props.studentEmail)
        .then((response) => {
          setStudentPoints(response)
        })
        .catch(() => {
          setStudentPoints(null)
        })
    }
  }, [props])

  return (
    <Modal show={props.show} onHide={() => props.setModalOpen(false)} size={'xl'}>
      <ModalHeader>
        <h4>Tabela punktów studenta</h4>
      </ModalHeader>
      <ModalBody>
        <LastPointsTable pointsList={studentPoints} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => props.setModalOpen(false)}>Zamknij</Button>
      </ModalFooter>
    </Modal>
  )
}

export default StudentPointsModal
