import { Col, Container, Row } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import MobileNavbar from '../general/Sidebar/MobileNavbar'
import Sidebar from '../general/Sidebar/Sidebar'
import './App.css'
import { SidebarCol } from './AppGeneralStyles'
import { connect } from 'react-redux'
import AuthVerify from '../../common/auth-verify'
import { ToastContainer } from 'react-toastify'
import { isStudent } from '../../utils/storageManager'
import AppRoutes from '../../routes/AppRoutes'
import { ProfessorSidebarTitles, UserSidebarTitles } from '../../utils/sidebarTitles'

function App(props) {
  const student = isStudent(props.user)
  const sidebarColsNumber = props.sidebar.isExpanded ? 2 : 1

  return (
    <>
      <Container fluid className='p-0'>
        <Row style={{ minHeight: '100vh', margin: 0 }}>
          <BrowserRouter>
            <SidebarCol
              xs={sidebarColsNumber}
              className={window.location.pathname === '/' ? 'd-none' : 'd-md-block d-none'}
            >
              <Sidebar link_titles={student ? UserSidebarTitles : ProfessorSidebarTitles} />
            </SidebarCol>
            <Col md={12 - sidebarColsNumber} xs={12} className='p-0'>
              <AppRoutes />
            </Col>
            <SidebarCol xs={12} className={window.location.pathname === '/' ? 'd-none' : 'd-md-none d-block'}>
              <MobileNavbar link_titles={student ? UserSidebarTitles : ProfessorSidebarTitles} />
            </SidebarCol>
            <AuthVerify />
          </BrowserRouter>
        </Row>
      </Container>
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'colored'}
      />
    </>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth
  const sidebar = state.sidebar
  return {
    user,
    sidebar
  }
}
export default connect(mapStateToProps)(App)
