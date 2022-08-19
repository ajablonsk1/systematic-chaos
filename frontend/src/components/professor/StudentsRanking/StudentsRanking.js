import React, { useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import Ranking from '../../general/Ranking/Ranking'
import { debounce } from 'lodash/function'
import { Form } from 'react-bootstrap'
import RankingService from '../../../services/ranking.service'

function StudentsRanking() {
  const [ranking, setRanking] = useState(undefined)
  const [filteredList, setFilteredList] = useState(undefined)

  useEffect(() => {
    RankingService.getGlobalRankingList()
      .then((response) => {
        setRanking(response)
        setFilteredList(response)
      })
      .catch(() => {
        setRanking(null)
        setFilteredList(null)
      })
  }, [])

  const filterList = debounce((query) => {
    if (!query) return setFilteredList([...ranking])
    setFilteredList(
      ranking?.filter((student) =>
        (student.firstName.toLowerCase() + ' ' + student.lastName.toLowerCase()).includes(query?.toLowerCase())
      )
    )
  }, 300)

  return (
    <Content>
      <Form.Group className={'py-3 px-4'}>
        <Form.Control type={'text'} placeholder={'Wyszukaj studenta...'} onChange={(e) => filterList(e.target.value)} />
      </Form.Group>
      <Ranking rankingList={filteredList} />
    </Content>
  )
}

export default StudentsRanking
