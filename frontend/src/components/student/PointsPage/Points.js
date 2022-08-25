import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, Spinner } from 'react-bootstrap'
import { Content } from '../../App/AppGeneralStyles'
import PercentageCircle from './ChartAndStats/PercentageCircle'
import LastPointsTable from './Tables/LastPointsTable'
import { TabsContainer } from './PointsPageStyle'
import BonusPointsTable from './Tables/BonusPointsTable'
import StudentService from '../../../services/student.service'

export default function Points() {
  const [pointsData, setPointsData] = useState(undefined)
  const [totalPointsData, setTotalPointsData] = useState(undefined)
  const percentToNextRank = 21
  const pointsToNextRank = 210

  useEffect(() => {
    StudentService.getPointsStats()
      .then((response) => {
        setPointsData(response)
      })
      .catch(() => {
        setPointsData(null)
      })
    StudentService.getTotalReceivedPoints()
      .then((response) => {
        setTotalPointsData(response)
      })
      .catch(() => {
        setTotalPointsData(null)
      })
  }, [])

  return (
    <Content>
      <Row className='m-0'>
        <Col className='p-0'>
          {totalPointsData === undefined ? (
            <Spinner animation={'border'} />
          ) : totalPointsData == null ? (
            <p>Błąd</p>
          ) : (
            <PercentageCircle
              percentageValue={Math.round(
                100 * (totalPointsData.totalPointsReceived / totalPointsData.totalPointsPossibleToReceive)
              )}
              points={totalPointsData.totalPointsReceived}
              maxPoints={totalPointsData.totalPointsPossibleToReceive}
            />
          )}
        </Col>
        <Col className='p-0 justify-content-center d-flex flex-column'>
          <h5>
            {totalPointsData === undefined ? (
              <Spinner animation={'border'} />
            ) : totalPointsData == null ? (
              <p>Błąd</p>
            ) : (
              <strong>Twój wynik to: {totalPointsData.totalPointsReceived}pkt</strong>
            )}
          </h5>
          <h5>
            <strong>Co stanowi: {percentToNextRank}%</strong>
          </h5>
          <h5>
            {/* not yet here */}
            <strong>Do kolejnego poziomu wymagane jest: {pointsToNextRank}pkt</strong>
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
            <LastPointsTable pointsList={pointsData} />
          </Tab>
          <Tab eventKey={'bonus-points'} title={'Punkty dodatkowe'}>
            <BonusPointsTable />
          </Tab>
        </TabsContainer>
      </Row>
    </Content>
  )
}
