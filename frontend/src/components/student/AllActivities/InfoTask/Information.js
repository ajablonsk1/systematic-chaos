import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Activity, ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../../utils/constants'
import { Content } from '../../../App/AppGeneralStyles'
import { InformationTable } from './InformationStyles'
import Loader from '../../../general/Loader/Loader'
import InfoTaskService from '../../../../services/infoTask.service'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomCard } from '../../GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import GridLayout from 'react-grid-layout'

export default function Information() {
  const location = useLocation()
  const { activityId: informationId } = location.state

  const [information, setInformation] = useState(undefined)
  const gridCardRef = useRef()

  useEffect(() => {
    InfoTaskService.getInformation(informationId)
      .then((response) => setInformation(response))
      .catch(() => setInformation(null))
  }, [informationId])

  const activityInfoCardBody = useMemo(() => {
    if (information === undefined) {
      return <Loader />
    }
    if (information == null) {
      return <p>{ERROR_OCCURRED}</p>
    }

    const tableElements = [
      { name: 'Typ aktywności', value: getActivityTypeName(Activity.INFO) },
      { name: 'Nazwa', value: information.name },
      { name: 'Opis', value: 'Tutaj będzie krótki opis gdy backend to doda' }
    ]

    return (
      <InformationTable>
        <tbody>
          <tr>
            <td>Ikonka aktywności:</td>
            <td>
              <img height={45} src={getActivityImg(Activity.INFO)} alt={'info-task-icon'} />
            </td>
          </tr>
          {tableElements.map((element, index) => (
            <tr key={index + Date.now()}>
              <td>{element.name}:</td>
              <td>{element.value}</td>
            </tr>
          ))}
        </tbody>
      </InformationTable>
    )
  }, [information])

  const imagesGridLayout = useMemo(() => {
    if (information === undefined) {
      return <Loader />
    }
    if (information === null) {
      return <p>{ERROR_OCCURRED}</p>
    }

    const images = information.imageUrls.concat([...information.imageUrls, ...information.imageUrls])

    const imagesNumber = images.length
    const parentWidth = gridCardRef.current.offsetWidth - 32
    const parentHeight = gridCardRef.current.offsetHeight - 50
    const imagesNumberInOneRow = 3
    const rowsNumber = Math.ceil(imagesNumber / 3)

    const imagesHeight = []
    images.forEach((url) => {
      const imgTemplate = document.createElement('img')
      imgTemplate.src = url
      const originalWidth = imgTemplate.width
      const originalHeight = imgTemplate.height
      const scaledWidth = Math.floor(parentWidth / imagesNumberInOneRow)
      const scaledHeight = Math.floor((originalHeight * scaledWidth) / originalWidth)

      imagesHeight.push(scaledHeight)
    })

    const rowHeight = Math.min(...imagesHeight)
    console.log(rowHeight)

    // const layout = [
    //   { i: '0', x: 0, y: 0, w: 1, h: 2 },
    //   { i: '1', x: 1, y: 0, w: 3, h: 2 },
    //   { i: '2', x: 4, y: 0, w: 1, h: 2 }
    // ]
    // return (
    //   <GridLayout className='layout' layout={layout} cols={12} rowHeight={30} width={1200}>
    //     <div key='0' style={{ background: 'red' }}>
    //       a
    //     </div>
    //     <div key='1' style={{ background: 'red' }}>
    //       b
    //     </div>
    //     <div key='2' style={{ background: 'red' }}>
    //       c
    //     </div>
    //   </GridLayout>
    // )

    const layout = images.map((url, index) => {
      const rowNumber = Math.floor(index / imagesNumberInOneRow)

      console.log(
        index.toString(),
        index % imagesNumberInOneRow,
        index >= imagesNumberInOneRow ? imagesHeight[index - imagesNumberInOneRow] + rowNumber : 0,
        Math.ceil(imagesHeight[index] / rowHeight)
      )

      return {
        i: index.toString(),
        x: index % imagesNumberInOneRow,
        y: index >= imagesNumberInOneRow ? imagesHeight[index - imagesNumberInOneRow] + rowNumber : 0,
        w: 1,
        h: Math.ceil(imagesHeight[index] / rowHeight) //Math.round(imgTemplate.height / imgTemplate.width)
      }
    })

    return (
      <GridLayout
        className={'layout'}
        layout={layout}
        cols={imagesNumberInOneRow}
        width={parentWidth}
        rowHeight={rowHeight}
      >
        {images.map((url, index) => (
          <div key={index.toString()}>
            <img width={'100%'} height={'100%'} src={url} alt={'info-task-attachment'} />
          </div>
        ))}
      </GridLayout>
    )
  }, [information])

  return (
    <Content>
      <Row className={'m-0 vh-100'}>
        <Col md={6} className={'py-2'}>
          <Row className={'m-0 w-100 h-25 pb-2'}>
            <CustomCard className={'p-0'}>
              <CardHeader>
                <h5>Informacje o aktywności</h5>
              </CardHeader>
              <Card.Body>{activityInfoCardBody}</Card.Body>
            </CustomCard>
          </Row>
          <Row className={'m-0 w-100 h-75'}>
            <CustomCard className={'p-0'}>
              <CardHeader>
                <h5>Opis</h5>
              </CardHeader>
              <Card.Body className={'overflow-auto'} style={{ maxHeight: '70vh' }}>
                {information === undefined ? (
                  <Loader />
                ) : information == null ? (
                  <p>{ERROR_OCCURRED}</p>
                ) : (
                  <p>{information.description}</p>
                )}
              </Card.Body>
            </CustomCard>
          </Row>
        </Col>
        <Col md={6} className={'py-2'}>
          <CustomCard className={'p-0'} style={{ maxHeight: '98.3vh', overflowY: 'auto' }}>
            <CardHeader className={'position-sticky top-0'} style={{ zIndex: 2 }}>
              <h5>Galeria zdjęć</h5>
            </CardHeader>
            <Card.Body ref={gridCardRef}>{imagesGridLayout}</Card.Body>
          </CustomCard>
        </Col>
      </Row>
    </Content>
  )
}
