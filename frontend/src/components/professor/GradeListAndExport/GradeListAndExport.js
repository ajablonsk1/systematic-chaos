import { Tab } from 'react-bootstrap'
import UsersTable from './UsersTable'
import { GradesContent } from './GradeListAndExportStyles'
import { TabsContainer } from './GradeListAndExportStyles'
import { useEffect, useState } from 'react'
import GroupService from '../../../services/group.service'
import Loader from '../../general/Loader/Loader'
import { connect } from 'react-redux'

function GradeListAndExport(props) {
  const [allGroups, setAllGroups] = useState(undefined)

  useEffect(() => {
    GroupService.getGroups()
      .then((response) => setAllGroups(response))
      .catch(() => setAllGroups(null))
  }, [])

  return (
    <GradesContent>
      <TabsContainer
        $background={props.theme.success}
        $linkColor={props.theme.primary}
        $fontColor={props.theme.background}
      >
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

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(GradeListAndExport)
