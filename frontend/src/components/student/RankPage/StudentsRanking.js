import React from 'react'
import { Content } from '../../App/AppGeneralStyles'
import Ranking from '../../general/Ranking/Ranking'
import { getRanking, myPosition } from '../../general/Ranking/mockData'

function StudentsRanking() {
  const ranking = getRanking()
  const userId = myPosition()

  return (
    <Content>
      <Ranking rankingList={ranking} studentId={userId} />
    </Content>
  )
}

export default StudentsRanking
