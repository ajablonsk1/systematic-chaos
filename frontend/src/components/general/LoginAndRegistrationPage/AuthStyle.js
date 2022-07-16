import { Col, Tabs } from 'react-bootstrap'
import styled from 'styled-components'

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
`

export const AuthFormContainer = styled(Col)`
  background-color: var(--dark-blue);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    width: 100%;
  }
`

export const Logo = styled.div`
  text-align: center;
  color: var(--font-color);
  font-size: 32px;

  & > *:first-child {
    font-size: 40px;
  }
`

export const TabsContainer = styled(Tabs)`
  border: none;
  font-size: 24px;
  display: flex;
  justify-content: center;

  & .nav-item {
    margin: 0 5px;
  }

  & .nav-link.active {
    border: none;
    outline: none;
  }

  & .nav-link {
    background-color: transparent;
    color: white;
  }
`

export const AccountType = styled(Col)`
  background-color: var(--button-green);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  padding: 10px;
  transition: all 0.2s linear;

  & img {
    width: 50%;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`

export const OK = styled.div`
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-80%, -80%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 5px;
    left: 5px;

    height: 8px;
    width: 16px;
    border: solid white;
    border-width: 0 0 4px 4px;
    transform: rotate(-45deg);
  }
`
