import React, { useRef, useState } from 'react'
import { Row, Tab } from 'react-bootstrap'
import { AccountType, OK, TabsContainer } from './AuthStyle'
import LoginForm from './LoginPage/LoginForm'
import RegistrationForm from './RegistrationPage/RegistrationForm'
import student from '../../../utils/resources/registration/graduated-white.png'

import teacher from '../../../utils/resources/registration/teacher-white.png'
import { connect } from 'react-redux'

function AuthTabs(props) {
  const [studentAccount, setStudentAccount] = useState(true)
  const teacherRef = useRef(null)
  const studentRef = useRef(null)

  return (
    <TabsContainer defaultActiveKey='login' id='uncontrolled-tab-example' style={{ padding: '50px 0 20px 0' }}>
      <Tab eventKey='login' title='Logowanie'>
        <div style={{ minHeight: '70vh' }}>
          <LoginForm />
        </div>
      </Tab>
      <Tab eventKey='registration' title='Rejestracja'>
        <div style={{ minHeight: '70vh' }}>
          <h6 className='text-center'>Wybierz typ konta</h6>
          <Row className='w-50 mx-auto'>
            <AccountType
              $background={props.theme.success}
              className='mb-1'
              ref={studentRef}
              onClick={() => setStudentAccount(true)}
            >
              <img src={student} alt='student' />
              student
              {studentAccount ? <OK /> : <></>}
            </AccountType>
            <AccountType
              $background={props.theme.success}
              className='mb-1'
              ref={teacherRef}
              onClick={() => setStudentAccount(false)}
            >
              <img src={teacher} alt='teacher' />
              prowadzący
              {!studentAccount ? <OK /> : <></>}
            </AccountType>
          </Row>
          <br />
          <Row className='w-100 mx-auto px-5 d-flex flex-column align-items-center'>
            <RegistrationForm isStudent={studentAccount} />
          </Row>
        </div>
      </Tab>
    </TabsContainer>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(AuthTabs)
