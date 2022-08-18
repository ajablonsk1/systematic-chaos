import React, { useState, useEffect } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import Ranking from '../../general/Ranking/Ranking'
import { myPosition } from '../../general/Ranking/mockData'
import RankingService from '../../../services/ranking.service'

function StudentsRanking() {
  const [ranking, setRanking] = useState(undefined)
  const userId = myPosition()

  useEffect(() => {
    RankingService.getRankingList()
      .then((response) => {
        setRanking(response)
      })
      .catch(() => {
        setRanking(null)
      })
  }, [])

  return (
    <Content>
      <Ranking rankingList={ranking} studentId={userId} />
    </Content>
  )
}

export default StudentsRanking
