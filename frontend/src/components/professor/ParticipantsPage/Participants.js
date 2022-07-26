import React, { useEffect, useState } from 'react'
import { Tab } from 'react-bootstrap'
import ParticipantsTable from './ParticipantsTable'
import { ParticipantsContent, TabsContainer } from './ParticipantsStyles'
import GroupService from '../../../services/group.service'
import Loader from '../../general/Loader/Loader'

function Participants() {
  const [allGroups, setAllGroups] = useState(undefined)

  useEffect(() => {
    GroupService.getGroups().then((response) => setAllGroups(response))
  }, [])

  return (
    <ParticipantsContent>
      {!allGroups ? (
        <Loader />
      ) : (
        <TabsContainer defaultActiveKey={'wszyscy'}>
          <Tab eventKey={'wszyscy'} title={'Wszyscy'}>
            <ParticipantsTable />
          </Tab>

          {allGroups.map((group, index) => (
            <Tab key={index + group.name} title={group.name} eventKey={group.name}>
              <ParticipantsTable groupId={group.id} groupName={group.name} />
            </Tab>
          ))}
        </TabsContainer>
      )}
    </ParticipantsContent>
  )
}

export default Participants
