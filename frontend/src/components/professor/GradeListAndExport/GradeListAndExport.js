import { Tab } from 'react-bootstrap'
import UsersTable from './UsersTable'
import { GradesContent } from './GradeListAndExportStyles'
import { TabsContainer } from './GradeListAndExportStyles'
import { useEffect, useState } from 'react'
import GroupService from '../../../api/services/group.service'
import Loader from '../../general/Loader/Loader'

export default function GradeListAndExport() {
  const [allGroups, setAllGroups] = useState(undefined)

  useEffect(() => {
    GroupService.getGroups()
      .then((response) => setAllGroups(response))
      .catch(() => setAllGroups(null))
  }, [])

  return (
    <GradesContent>
      <TabsContainer>
        <Tab eventKey={'wszyscy'} title={'Wszyscy'}>
          <UsersTable />
        </Tab>

        {allGroups
          ? allGroups.map((group, index) => (
              <Tab key={index + group.name} title={group.name} eventKey={group.name}>
                <UsersTable groupId={group.id} groupName={group.name} />
              </Tab>
            ))
          : allGroups === undefined && <Loader />}
      </TabsContainer>
    </GradesContent>
  )
}
