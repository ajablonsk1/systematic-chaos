import React, { useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TeacherRoutes } from '../../../routes/PageRoutes'
import { successToast } from '../../../utils/toasts'
import { useDeleteChapterQuery } from '../../../api/hooks/chapterController.hooks'

function DeletionModal(props) {
  const navigate = useNavigate()
  const [isDeletionCalled, setIsDeletionCalled] = useState(false)

  const deleteChapterData = useDeleteChapterQuery(props.chapterId, { skip: !isDeletionCalled })

  useEffect(() => {
    if (deleteChapterData.isSuccess) {
      successToast('Rozdział usunięty pomyślnie.')
      props.setModalOpen(false)
      navigate(TeacherRoutes.GAME_MANAGEMENT.MAIN)
      setIsDeletionCalled(false)
    }

    // eslint-disable-next-line
  }, [deleteChapterData.isSuccess, props])

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
          <Button variant={'danger'} onClick={() => setIsDeletionCalled(true)}>
            Usuń
          </Button>
          {deleteChapterData.isError && <p className={'text-danger'}>{deleteChapterData.errorInfo}</p>}
        </Card.Footer>
      </Card>
    </Modal>
  )
}

export default DeletionModal
