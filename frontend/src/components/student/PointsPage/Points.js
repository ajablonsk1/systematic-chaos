import React from 'react'
import { Col, Row, Tab } from 'react-bootstrap'
import { Content } from '../../App/AppGeneralStyles'
import PercentageCircle from './ChartAndStats/PercentageCircle'
import LastPointsTable from './Tables/LastPointsTable'
import { TabsContainer } from './PointsPageStyle'
import GratisPointsTable from './Tables/GratisPointsTable'

export default function Points() {
  const points = 529
  const maxPoints = 1000
  const percentageValue = Math.round(100 * (points / maxPoints))

  return (
    <Content>
      <Row className='m-0'>
        <Col className='p-0'>
          <PercentageCircle percentageValue={percentageValue} points={points} maxPoints={maxPoints} />
        </Col>
        <Col className='p-0 justify-content-center d-flex flex-column'>
          <h5>
            <strong>Twój wynik to: {points}pkt</strong>
          </h5>
          <h5>
            <strong>Co stanowi: {percentageValue}%</strong>
          </h5>
          <h5>
            <strong>Do kolejnego poziomu wymagane jest: {maxPoints}pkt</strong>
          </h5>
        </Col>
      </Row>
      <Row className='m-3'>
        <TabsContainer
          className={'w-100'}
          defaultActiveKey='last-points'
          id='points-tabs'
          style={{ padding: '50px 0 20px 0' }}
        >
          <Tab className={'w-100'} eventKey='last-points' title='Ostatnio zdobyte punkty'>
            <LastPointsTable />
          </Tab>
          <Tab eventKey={'gratis-points'} title={'Punkty dodatkowe'}>
            <GratisPointsTable />
          </Tab>
        </TabsContainer>
      </Row>
    </Content>
  )
}
