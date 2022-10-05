import React, { useEffect, useState } from 'react'
import { Tab } from 'react-bootstrap'
import ParticipantsTable from './ParticipantsTable'
import { ParticipantsContent, TabsContainer } from './ParticipantsStyles'
import GroupService from '../../../services/group.service'
import Loader from '../../general/Loader/Loader'
import { connect } from 'react-redux'

function Participants(props) {
  const [allGroups, setAllGroups] = useState(undefined)

  useEffect(() => {
    GroupService.getGroups()
      .then((response) => setAllGroups(response))
      .catch(() => setAllGroups(null))
  }, [])

  return (
    <ParticipantsContent>
      {allGroups === undefined ? (
        <Loader />
      ) : (
        <TabsContainer
          $background={props.theme.success}
          $fontColor={props.theme.background}
          $linkColor={props.theme.primary}
          defaultActiveKey={'wszyscy'}
        >
          <Tab eventKey={'wszyscy'} title={'Wszyscy'}>
            <ParticipantsTable />
          </Tab>

          {allGroups &&
            allGroups.map((group, index) => (
              <Tab key={index + group.name} title={group.name} eventKey={group.name}>
                <ParticipantsTable groupId={group.id} groupName={group.name} />
              </Tab>
            ))}
        </TabsContainer>
      )}
    </ParticipantsContent>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(Participants)
