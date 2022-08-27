import React, { useEffect, useState } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { TabsContainer } from '../../ParticipantsPage/ParticipantsStyles'
import { Form, Tab } from 'react-bootstrap'
import Ranking from '../../../general/Ranking/Ranking'
import { debounce } from 'lodash/function'
import ActivityService from '../../../../services/activity.service'
import { useLocation } from 'react-router-dom'

function ActivityDetails(props) {
  const location = useLocation()
  const { activityId } = location.state

  const [studentsList, setStudentsList] = useState(undefined)
  const [filteredList, setFilteredList] = useState(undefined)
  const [filterQuery, setFilterQuery] = useState(undefined)

  useEffect(() => {
    ActivityService.getStudentsResultList(activityId)
      .then((response) => {
        setStudentsList(response)
        setFilteredList(response)
      })
      .catch(() => {})
    setStudentsList(null)
    setFilteredList(null)
  }, [activityId])

  useEffect(() => {
    if (filterQuery) {
      ActivityService.getFilteredStudentsResultList(activityId, filterQuery)
        .then((response) => {
          setFilteredList(response)
        })
        .catch(() => {
          setFilteredList(null)
        })
    } else {
      setFilteredList(studentsList)
    }
  }, [filterQuery, studentsList, activityId])

  const filterList = debounce((query) => {
    setFilterQuery(query)
  }, 300)

  return (
    <Content>
      <TabsContainer defaultActiveKey={'results'}>
        <Tab eventKey={'results'} title={'Wyniki'}>
          <Form.Group className={'py-3 px-4'}>
            <Form.Control
              type={'text'}
              placeholder={'Wyszukaj po grupie lub studencie lub typie bohatera...'}
              onChange={(e) => filterList(e.target.value)}
            />
          </Form.Group>

          <Ranking rankingList={filteredList} customHeight={'80vh'} />
        </Tab>
        <Tab eventKey={'statistics'} title={'Statystyki'}>
          STATS
        </Tab>
      </TabsContainer>
    </Content>
  )
}

export default ActivityDetails
