import React, { useCallback, useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import Ranking from '../../general/Ranking/Ranking'
import { debounce } from 'lodash/function'
import { Form } from 'react-bootstrap'
import RankingService from '../../../api/services/ranking.service'
import StudentPointsModal from './StudentPointsModal'

function StudentsRanking() {
  const [ranking, setRanking] = useState(undefined)
  const [filteredList, setFilteredList] = useState(undefined)
  const [filterQuery, setFilterQuery] = useState(undefined)
  const [isStudentPointsModalOpen, setIsStudentPointsModalOpen] = useState(false)
  const [chosenStudentEmail, setChosenStudentEmail] = useState(null)

  const onInfoIconClick = useCallback((chosenEmail) => {
    setIsStudentPointsModalOpen(true)
    setChosenStudentEmail(chosenEmail)
  }, [])

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

  useEffect(() => {
    if (filterQuery) {
      RankingService.getFilteredRanking(filterQuery)
        .then((response) => {
          setFilteredList(response)
        })
        .catch(() => {
          setFilteredList(null)
        })
    } else {
      setFilteredList(ranking)
    }
  }, [filterQuery, ranking])

  const filterList = debounce((query) => {
    setFilterQuery(query)
  }, 300)

  return (
    <Content>
      <Form.Group className={'py-3 px-4'}>
        <Form.Control
          type={'text'}
          placeholder={'Wyszukaj po grupie lub studencie lub typie bohatera...'}
          onChange={(e) => filterList(e.target.value)}
        />
      </Form.Group>
      <Ranking rankingList={filteredList} iconCallback={onInfoIconClick} />
      <StudentPointsModal
        show={isStudentPointsModalOpen}
        setModalOpen={setIsStudentPointsModalOpen}
        studentEmail={chosenStudentEmail}
      />
    </Content>
  )
}

export default StudentsRanking
