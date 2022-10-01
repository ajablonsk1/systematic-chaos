import React, { useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Activity, ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../../utils/constants'
import { Content } from '../../../App/AppGeneralStyles'
import { InformationTable } from './InformationStyles'
import Loader from '../../../general/Loader/Loader'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomCard } from '../../GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import ImagesGallery from '../../../general/ImagesGallery/ImagesGallery'
import { useGetInfoQuery } from '../../../../api/hooks/infoController.hooks'

export default function Information() {
  const location = useLocation()
  const { activityId: informationId } = location.state
  const gridCardRef = useRef()

  const getInfoData = useGetInfoQuery(informationId)

  const activityInfoCardBody = useMemo(() => {
    if (getInfoData.isFetching) {
      return <Loader />
    }

    if (getInfoData.isError) {
      return <p>{ERROR_OCCURRED}</p>
    }

    if (getInfoData.data) {
      const tableElements = [
        { name: 'Typ aktywności', value: getActivityTypeName(Activity.INFO) },
        { name: 'Nazwa', value: getInfoData.data.name },
        { name: 'Opis', value: getInfoData.data.description }
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
    }
  }, [getInfoData])

  const imagesGridLayout = useMemo(() => {
    if (getInfoData.isFetching) {
      return <Loader />
    }
    if (getInfoData.isError) {
      return <p>{ERROR_OCCURRED}</p>
    }

    if (gridCardRef.current?.offsetWidth && getInfoData.data) {
      return <ImagesGallery width={gridCardRef.current.offsetWidth - 32} images={getInfoData.data.imageUrls} cols={3} />
    }

    return <></>
  }, [getInfoData])

  return (
    <Content>
      <Row className={'m-0 vh-100'}>
        <Col md={6} className={'py-2'}>
          <Row className={'m-0 w-100 h-25 pb-5'}>
            <CustomCard className={'p-0'}>
              <CardHeader>
                <h5>Informacje o aktywności</h5>
              </CardHeader>
              <Card.Body>{activityInfoCardBody}</Card.Body>
            </CustomCard>
          </Row>
          <Row className={'m-0 w-100 h-75 pt-4'}>
            <CustomCard className={'p-0'}>
              <CardHeader>
                <h5>Wytyczne</h5>
              </CardHeader>
              <Card.Body className={'overflow-auto'} style={{ maxHeight: '70vh' }}>
                {getInfoData.isFetching ? (
                  <Loader />
                ) : getInfoData.isError ? (
                  <p>{ERROR_OCCURRED}</p>
                ) : (
                  <p>{getInfoData.data?.content}</p>
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
