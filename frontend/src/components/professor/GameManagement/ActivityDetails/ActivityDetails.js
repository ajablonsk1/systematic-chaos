import React, { useState } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { TabsContainer } from '../../ParticipantsPage/ParticipantsStyles'
import { Form, Tab } from 'react-bootstrap'
import Ranking from '../../../general/Ranking/Ranking'
import { getResultsList } from './mockData'
import { debounce } from 'lodash/function'
import ActivityStats from './ActivityStats'
import { useLocation } from 'react-router-dom'

function ActivityDetails() {
  const location = useLocation()
  const { activityId } = location.state

  const [filterQuery, setFilterQuery] = useState(undefined)

  const resultsList = getResultsList()

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

          <Ranking rankingList={resultsList} />
        </Tab>
        <Tab eventKey={'statistics'} title={'Statystyki'}>
          <ActivityStats activityId={activityId} />
        </Tab>
      </TabsContainer>
    </Content>
  )
}

export default ActivityDetails
