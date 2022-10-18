import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import LastPointsTable from '../../student/PointsPage/Tables/LastPointsTable'
import ProfessorService from '../../../services/professor.service'
import { connect } from 'react-redux'

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
      <ModalBody style={{ overflow: 'auto', padding: '0', margin: '10px' }}>
        <LastPointsTable pointsList={studentPoints} />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => props.setModalOpen(false)}
          style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
        >
          Zamknij
        </Button>
      </ModalFooter>
    </Modal>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(StudentPointsModal)
