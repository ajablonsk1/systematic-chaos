import React, { useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import Ranking from '../../general/Ranking/Ranking'
import { debounce } from 'lodash/function'
import { Form } from 'react-bootstrap'
import { getRanking } from '../../general/Ranking/mockData'

function StudentsRanking() {
  const ranking = getRanking()
  const [filteredList, setFilteredList] = useState([...ranking])

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
      <Form.Group className={'my-3 mx-4'}>
        <Form.Control type={'text'} placeholder={'Wyszukaj studenta...'} onChange={(e) => filterList(e.target.value)} />
      </Form.Group>
      <Ranking rankingList={filteredList} />
    </Content>
  )
}

export default StudentsRanking
