import React from 'react'
import { Tab } from 'react-bootstrap'
import ParticipantsTable from './ParticipantsTable'
import { ParticipantsContent, TabsContainer } from './ParticipantsStyles'
import Loader from '../../general/Loader/Loader'
import { useGetGroupInvitationCodeListQuery } from '../../../api/hooks/groupController.hooks'

function Participants() {
  const groupsData = useGetGroupInvitationCodeListQuery()

  return (
    <ParticipantsContent>
      {groupsData.isFetching ? (
        <Loader />
      ) : groupsData.isError ? (
        <p>{groupsData.errorInfo}</p>
      ) : (
        <TabsContainer defaultActiveKey={'wszyscy'}>
          <Tab eventKey={'wszyscy'} title={'Wszyscy'}>
            <ParticipantsTable />
          </Tab>

          {groupsData.data?.map((group, index) => (
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
