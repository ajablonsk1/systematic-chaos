import { Tab } from 'react-bootstrap'
import UsersTable from './UsersTable'
// import { getAllParticipants, getGroups } from '../ParticipantsPage/mockData'
import { GradesContent } from './GradeListAndExportStyles'
import { TabsContainer } from './GradeListAndExportStyles'
import { useEffect, useState } from 'react'
import GroupService from '../../../services/group.service'
import Loader from '../../general/Loader/Loader'

export default function GradeListAndExport() {
  const [allGroups, setAllGroups] = useState(undefined)

  useEffect(() => {
    GroupService.getGroups().then((response) => setAllGroups(response))
  }, [])

  return (
    <GradesContent>
      <TabsContainer>
        <Tab eventKey={'wszyscy'} title={'Wszyscy'}>
          <UsersTable />
        </Tab>

        {allGroups ? (
          allGroups.map((group, index) => (
            <Tab key={index + group.name} title={group.name} eventKey={group.name}>
              <UsersTable groupId={group.id} groupName={group.name} />
            </Tab>
          ))
        ) : (
          <Loader />
        )}
      </TabsContainer>
    </GradesContent>
  )
}
