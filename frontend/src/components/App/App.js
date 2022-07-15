import { Col, Container, Row } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import { TeacherSidebarTitles, UserSidebarTitles } from '../../utils/constants'
import MobileNavbar from '../general/Sidebar/MobileNavbar'
import Sidebar from '../general/Sidebar/Sidebar'
import './App.css'
import { SidebarCol } from './AppGeneralStyles'
import { connect } from 'react-redux'
import AuthVerify from '../../common/auth-verify'
import { ToastContainer } from 'react-toastify'
import { isStudent } from '../../utils/storageManager'
import AppRoutes from '../../routes/AppRoutes'
import { generateFullPath, PageRoutes } from '../../routes/PageRoutes'

function App(props) {
  const student = isStudent(props.user)
  return (
    <>
      <Container fluid className='p-0'>
        <Row style={{ minHeight: '100vh', margin: 0 }}>
          <BrowserRouter>
            <SidebarCol
              xs={2}
              className={
                window.location.pathname === generateFullPath(() => PageRoutes.General.HOME)
                  ? 'd-none'
                  : 'd-md-block d-none'
              }
            >
              <Sidebar link_titles={Object.entries(student ? UserSidebarTitles : TeacherSidebarTitles)} />
            </SidebarCol>
            <Col md={10} xs={12} className='p-0'>
              <AppRoutes />
            </Col>
            <SidebarCol
              xs={12}
              className={
                window.location.pathname === generateFullPath(() => PageRoutes.General.HOME)
                  ? 'd-none'
                  : 'd-md-none d-block'
              }
            >
              <MobileNavbar link_titles={Object.entries(student ? UserSidebarTitles : TeacherSidebarTitles)} />
            </SidebarCol>
            <AuthVerify />
          </BrowserRouter>
        </Row>
      </Container>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth
  return {
    user
  }
}
export default connect(mapStateToProps)(App)
