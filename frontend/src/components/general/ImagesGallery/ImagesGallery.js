import React, { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import { ControlPanel, ImageContainer } from './ImagesGalleryStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Button, Dropdown, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import download from 'downloadjs'

function ImagesGallery(props) {
  const [imagesHeight, setImagesHeight] = useState([])
  const [rowHeight, setRowHeight] = useState(undefined)
  const [layout, setLayout] = useState(undefined)
  const [isFullPreviewOpen, setIsFullPreviewOpen] = useState(false)
  const [fullPreviewSource, setFullPreviewSource] = useState({})

  useEffect(() => {
    setImagesHeight(Array(props.images.length).fill(0))

    props.images.forEach((url, index) => {
      const img = new Image()
      img.src = url
      img.onload = (e) => {
        const scaledWidth = Math.floor(props.width / props.cols)
        const scaledHeight = Math.floor((e.target.height * scaledWidth) / e.target.width)

        setImagesHeight((prevState) => prevState.map((value, i) => (i === index ? scaledHeight : value)))
      }
    })
  }, [props])

  useEffect(() => {
    if (!imagesHeight.includes(0)) {
      setRowHeight(...imagesHeight)
    }
  }, [imagesHeight])

  useEffect(() => {
    if (rowHeight) {
      const layoutConfig = props.images.map((url, index) => {
        const rowNumber = props.cols > 0 ? Math.floor(index / props.cols) : 1

        return {
          i: index.toString(),
          x: index % props.cols,
          y: index >= props.cols ? imagesHeight[index - props.cols] + rowNumber : 0,
          w: 1,
          h: imagesHeight[index] > 0 && rowHeight > 0 ? Math.ceil(imagesHeight[index] / rowHeight) : 1
        }
      })

      setLayout(layoutConfig)
    }
  }, [rowHeight, imagesHeight, props.images, props.cols])

  const openFullPreview = (e, url, index) => {
    e.stopPropagation()
    setIsFullPreviewOpen(true)
    setFullPreviewSource({ src: url, id: index, isFirst: index === 0, isLast: index === props.images.length })
  }

  const downloadFile = (e, url) => {
    e.stopPropagation()
    download(url)
  }

  const nextImage = (index) => {
    const nextImageId = Math.min(props.images.length - 1, index + 1)
    const isLast = nextImageId === props.images.length - 1
    setFullPreviewSource({ id: nextImageId, src: props.images[nextImageId], isFirst: false, isLast: isLast })
  }

  const prevImage = (index) => {
    const prevImageId = Math.max(0, index - 1)
    const isFirst = prevImageId === 0
    setFullPreviewSource({ id: prevImageId, src: props.images[prevImageId], isFirst: isFirst, isLast: false })
  }

  return (
    <>
      {layout && rowHeight && (
        <GridLayout
          className={'layout'}
          layout={layout}
          cols={props.cols}
          width={props.width}
          rowHeight={rowHeight > 0 ? rowHeight : props.width}
          isDraggable={false}
        >
          {props.images.map((url, index) => (
            <ImageContainer key={index.toString()} className={'rounded'}>
              <img className={'p-3'} width={'100%'} height={'100%'} src={url} alt={'info-task-attachment'} />

              <ControlPanel drop={'start'}>
                <Dropdown.Toggle variant='warning'>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={(e) => openFullPreview(e, url, index)}>Pełny podgląd</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => downloadFile(e, url)}>Pobierz</Dropdown.Item>
                </Dropdown.Menu>
              </ControlPanel>
            </ImageContainer>
          ))}
        </GridLayout>
      )}

      <Modal show={isFullPreviewOpen} onHide={() => setIsFullPreviewOpen(false)} size={'xl'}>
        <ModalHeader closeButton>
          <h5>Pełny podgląd plików</h5>
        </ModalHeader>
        <ModalBody className={'d-flex justify-content-center align-items-center'}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={'display-3 me-5'}
            onClick={() => {
              if (!fullPreviewSource.isFirst) {
                prevImage(fullPreviewSource.id)
              }
            }}
            style={{ opacity: fullPreviewSource.isFirst ? 0.5 : 1, cursor: 'pointer' }}
          />
          <img height={'100%'} src={fullPreviewSource.src} alt={'full-preview'} />
          <FontAwesomeIcon
            icon={faChevronRight}
            className={'display-3 ms-5'}
            onClick={() => {
              if (!fullPreviewSource.isLast) {
                nextImage(fullPreviewSource.id)
              }
            }}
            style={{ opacity: fullPreviewSource.isLast ? 0.5 : 1, cursor: 'pointer' }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsFullPreviewOpen(false)}>Zamknij</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ImagesGallery
