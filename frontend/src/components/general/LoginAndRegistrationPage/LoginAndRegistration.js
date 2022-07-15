import React from 'react'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row } from 'react-bootstrap'
import { AuthFormContainer, LoginContainer, Logo } from './AuthStyle'

import Carousel from './CharactersCarousel/Carousel'
import AuthTabs from './AuthTabs'

export default function LoginAndRegistration() {
  return (
    <LoginContainer>
      <Row className='w-100 h-100 align-items-center m-0'>
        <Carousel />
        <AuthFormContainer md={6} className='p-0'>
          <Logo>
            <FontAwesomeIcon icon={faFire} />
            <br />
            Systematic Chaos
          </Logo>
          <AuthTabs />
        </AuthFormContainer>
      </Row>
    </LoginContainer>
  )
}
