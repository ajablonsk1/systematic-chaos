import React, { useState, useEffect } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import Ranking from '../../general/Ranking/Ranking'
import { myPosition } from '../../general/Ranking/mockData'
import RankingService from '../../../services/ranking.service'
import { Tab } from 'react-bootstrap'
import { TabsContainer } from '../../professor/ParticipantsPage/ParticipantsStyles'

function StudentsRanking() {
  const [ranking, setRanking] = useState(undefined)
  const [studentGroupRanking, setStudentGroupRanking] = useState(undefined)
  const userId = myPosition()

  useEffect(() => {
    RankingService.getGlobalRankingList()
      .then((response) => {
        setRanking(response)
      })
      .catch(() => {
        setRanking(null)
      })

    RankingService.getStudentGroupRankingList()
      .then((response) => {
        setStudentGroupRanking(response)
      })
      .catch(() => {
        setStudentGroupRanking(null)
      })
  }, [])

  return (
    <Content>
      <TabsContainer defaultActiveKey={'global-rank'}>
        <Tab eventKey={'global-rank'} title={'Ranking ogólny'}>
          <Ranking rankingList={ranking} studentId={userId} />
        </Tab>
        <Tab eventKey={'student-group'} title={'Moja grupa'}>
          <Ranking rankingList={studentGroupRanking} studentId={userId} />
        </Tab>
      </TabsContainer>
    </Content>
  )
}

export default StudentsRanking
