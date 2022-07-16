import React from 'react'
import { Tab } from 'react-bootstrap'
import { getAllParticipants, getGroups } from './mockData'
import ParticipantsTable from './ParticipantsTable'
import { ParticipantsContent, TabsContainer } from './ParticipantsStyles'

function Participants() {
  // TODO: get groups using endpoint
  const groups = getGroups()
  const allParticipants = getAllParticipants()

  return (
    <ParticipantsContent>
      <TabsContainer defaultActiveKey={'all'}>
        <Tab eventKey={'all'} title={'Wszyscy'}>
          <ParticipantsTable data={allParticipants} />
        </Tab>

        {groups.map((group, index) => (
          <Tab key={index + group.groupKey} title={group.groupName} eventKey={group.groupKey}>
            <ParticipantsTable data={group} />
          </Tab>
        ))}
      </TabsContainer>
    </ParticipantsContent>
  )
}

export default Participants
