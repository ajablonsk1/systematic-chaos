import { Container } from 'react-bootstrap'
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

  return (
    <>
      <Container fluid className='p-0'>
        <div className={'d-flex'} style={{ minHeight: '100vh', margin: 0 }}>
          <BrowserRouter>
            <SidebarCol
              style={{ width: props.sidebar.isExpanded ? 350 : 60 }}
              className={window.location.pathname === '/' ? 'd-none' : 'd-md-block d-none'}
            >
              <Sidebar link_titles={student ? UserSidebarTitles : ProfessorSidebarTitles} />
            </SidebarCol>
            <div className='p-0 w-100'>
              <AppRoutes />
            </div>
            <SidebarCol className={window.location.pathname === '/' ? 'd-none' : 'd-md-none d-block'}>
              <MobileNavbar link_titles={student ? UserSidebarTitles : ProfessorSidebarTitles} />
            </SidebarCol>
            <AuthVerify />
          </BrowserRouter>
        </div>
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
