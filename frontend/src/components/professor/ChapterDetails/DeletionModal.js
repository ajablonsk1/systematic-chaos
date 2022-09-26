import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import ChapterService from '../../../services/chapter.service'
import { useNavigate } from 'react-router-dom'
import { TeacherRoutes } from '../../../routes/PageRoutes'
import { successToast } from '../../../utils/toasts'

function DeletionModal(props) {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const deleteChapter = () => {
    ChapterService.deleteChapter(props.chapterId)
      .then(() => {
        successToast('Rozdział usunięty pomyślnie.')
        props.setModalOpen(false)
        navigate(TeacherRoutes.GAME_MANAGEMENT.MAIN)
      })
      .catch((error) => setErrorMessage(error.response.data.message))
  }

  return (
    <Modal show={props.showModal} onHide={() => props.setModalOpen(false)}>
      <Card>
        <Card.Header>
          <Card.Title>{props.modalTitle}</Card.Title>
        </Card.Header>
        <Card.Body>{props.modalBody}</Card.Body>
        <Card.Footer className={'text-center'}>
          <Button className={'me-1'} variant={'secondary'} onClick={() => props.setModalOpen(false)}>
            Anuluj
          </Button>
          <Button variant={'danger'} onClick={deleteChapter}>
            Usuń
          </Button>
          <p className={'text-danger'}>{errorMessage}</p>
        </Card.Footer>
      </Card>
    </Modal>
  )
}

export default DeletionModal
