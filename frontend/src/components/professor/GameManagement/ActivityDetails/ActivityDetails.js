import React, { useState } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { TabsContainer } from '../../ParticipantsPage/ParticipantsStyles'
import { Form, Tab } from 'react-bootstrap'
import Ranking from '../../../general/Ranking/Ranking'
import { getResultsList } from './mockData'
import { debounce } from 'lodash/function'

function ActivityDetails(props) {
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
          STATS
        </Tab>
      </TabsContainer>
    </Content>
  )
}

export default ActivityDetails
