import { Tabs, Tab } from 'react-bootstrap'
import { Content } from '../../App/AppGeneralStyles'
import { Button } from 'react-bootstrap'
import UsersTable from './UsersTable'
import { getAllParticipants, getGroups } from './mockData'
export default function GradeListAndExport() {
  const allUsers = getAllParticipants()
  const groups = getGroups()
  return (
    <Content>
      <Tabs>
        <Tab eventKey={'all'} title={'Wszyscy'}>
          <UsersTable users={allUsers} />
        </Tab>

        {groups.map((group, index) => (
          <Tab key={index + group.groupKey} title={group.groupName} eventKey={group.groupKey}>
            <UsersTable users={group} />
          </Tab>
        ))}
      </Tabs>
      {/* <TableContainer></TableContainer> */}
      <Button>Eksportuj oceny</Button>
    </Content>
  )
}
