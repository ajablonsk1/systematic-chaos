import { Tab } from 'react-bootstrap'
import UsersTable from './UsersTable'
import { GradesContent } from './GradeListAndExportStyles'
import { TabsContainer } from './GradeListAndExportStyles'
import Loader from '../../general/Loader/Loader'
import { useGetGroupInvitationCodeListQuery } from '../../../api/hooks/groupController.hooks'

export default function GradeListAndExport() {
  const groupsData = useGetGroupInvitationCodeListQuery()

  return (
    <GradesContent>
      <TabsContainer>
        <Tab eventKey={'wszyscy'} title={'Wszyscy'}>
          <UsersTable />
        </Tab>

        {groupsData.isFetching ? (
          <Loader />
        ) : groupsData.isError ? (
          <p>{groupsData.errorInfo}</p>
        ) : (
          groupsData.data?.map((group, index) => (
            <Tab key={index + group.name} title={group.name} eventKey={group.name}>
              <UsersTable groupId={group.id} groupName={group.name} />
            </Tab>
          ))
        )}
      </TabsContainer>
    </GradesContent>
  )
}
