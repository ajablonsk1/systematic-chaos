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
import ImagesGallery from '../../../general/ImagesGallery/ImagesGallery'
import { connect } from 'react-redux'
import { isMobileView } from '../../../../utils/mobileHelper'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import GoBackButton from '../../../general/GoBackButton/GoBackButton'
import { StudentRoutes } from '../../../../routes/PageRoutes'

function Information(props) {
  const isMobileDisplay = isMobileView()

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
      { name: 'Opis', value: information.description }
    ]

    return (
      <InformationTable $fontColor={props.theme.font}>
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
  }, [information, props.theme.font])

  const imagesGridLayout = useMemo(() => {
    if (information === undefined) {
      return <Loader />
    }
    if (information === null) {
      return <p>{ERROR_OCCURRED}</p>
    }

    if (gridCardRef.current?.offsetWidth) {
      return <ImagesGallery width={gridCardRef.current.offsetWidth - 32} images={information.imageUrls} cols={3} />
    }

    return <></>
  }, [information])

  return (
    <Content style={{ marginBottom: isMobileDisplay ? '85px' : 'auto' }}>
      <Row className={`m-0 ${isMobileDisplay ? 'h-auto' : 'vh-100'}`}>
        <Col md={6} className={'py-2 vh-100'}>
          <Row className={'m-0 w-100 pb-2'} style={{ height: isMobileDisplay ? 'auto' : '25%' }}>
            <CustomCard
              className={'p-0'}
              $fontColor={props.theme.font}
              $background={props.theme.primary}
              $bodyColor={props.theme.secondary}
            >
              <CardHeader>
                <h5>Informacje o aktywności</h5>
              </CardHeader>
              <Card.Body>{activityInfoCardBody}</Card.Body>
            </CustomCard>
          </Row>
          <Row className={'m-0 w-100 mt-3'} style={{ height: isMobileDisplay ? 'auto' : '65%' }}>
            <CustomCard
              className={'p-0'}
              $fontColor={props.theme.font}
              $background={props.theme.primary}
              $bodyColor={props.theme.secondary}
            >
              <CardHeader>
                <h5>Wytyczne</h5>
              </CardHeader>
              <Card.Body className={'overflow-auto'} style={{ height: '70vh' }}>
                {information === undefined ? (
                  <Loader />
                ) : information == null ? (
                  <p>{ERROR_OCCURRED}</p>
                ) : (
                  <ReactMarkdown children={information.content} remarkPlugins={[remarkGfm]} />
                )}
              </Card.Body>
            </CustomCard>
            <GoBackButton goTo={StudentRoutes.GAME_MAP.MAIN} />
          </Row>
        </Col>
        <Col md={6} className={'py-2'}>
          <CustomCard
            $fontColor={props.theme.font}
            $background={props.theme.primary}
            $bodyColor={props.theme.secondary}
            className={'p-0'}
            style={{ maxHeight: '98.3vh', overflowY: 'auto' }}
          >
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

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(Information)
