import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import ChapterMap from './Map/ChapterMap'

function ChapterMapModal(props) {
  const [mapContainerSize, setMapContainerSize] = useState({ x: 0, y: 0 })
  const mapContainer = useRef()

  const updateContainerSize = () => {
    setMapContainerSize({
      x: mapContainer.current?.offsetWidth ?? 0,
      y: mapContainer.current?.offsetHeight ?? 0
    })
  }

  useEffect(() => {
    updateContainerSize()
  }, [props])

  useEffect(() => {
    window.addEventListener('resize', updateContainerSize)

    return () => {
      window.removeEventListener('resize', updateContainerSize)
    }
  }, [])

  return (
    <Modal show={props.show} onHide={() => props.setModalOpen(false)} size={'xl'}>
      <ModalHeader closeButton>
        <h5>Mapa aktywności rozdziału</h5>
      </ModalHeader>
      <ModalBody style={{ height: '70vh', padding: 0 }} ref={mapContainer}>
        {props.chapterId && (
          <ChapterMap chapterId={props.chapterId} marginNeeded mapClickable parentSize={mapContainerSize} />
        )}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => props.setModalOpen(false)}>Zamknij</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ChapterMapModal
