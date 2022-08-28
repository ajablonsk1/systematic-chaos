import React from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomCard } from '../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'

export default function GameSummary() {
  return (
    <Content>
      <Row className={'m-0'} style={{ height: '50vh' }}>
        <Col md={6}>
          <Row className={'m-0 h-50 py-2'}>
            <CustomCard>
              <CardHeader>
                <h5>Statystyki ocen studentów</h5>
              </CardHeader>
              <Card.Body>body</Card.Body>
            </CustomCard>
          </Row>
          <Row className={'m-0 h-50 py-2'}>
            <CustomCard>
              <CardHeader>
                <h5>Statystyki aktywności</h5>
              </CardHeader>
              <Card.Body>body</Card.Body>
            </CustomCard>
          </Row>
        </Col>
        <Col md={6} className={'py-2'}>
          <CustomCard>
            <CardHeader>
              <h5>Średnia ocen w każdej grupie</h5>
            </CardHeader>
            <Card.Body>body</Card.Body>
          </CustomCard>
        </Col>
      </Row>
      <Row className={'m-0'} style={{ height: '50vh' }}>
        <Col md={6} className={'py-2'}>
          <CustomCard>
            <CardHeader>
              <h5>Średni wynik z aktywności</h5>
            </CardHeader>
            <Card.Body>body</Card.Body>
          </CustomCard>
        </Col>
        <Col md={6} className={'py-2'}>
          <CustomCard>
            <CardHeader>
              <h5>Nieocenione aktywności</h5>
            </CardHeader>
            <Card.Body>body</Card.Body>
          </CustomCard>
        </Col>
      </Row>
    </Content>
  )
}
