import styled from 'styled-components'
import { Button, Col, Row } from 'react-bootstrap'

export const ActivityImg = styled.img`
  height: 30px;
  width: 30px;
  padding: 0;
  margin-right: 10px;
  margin: 0 10px;
  align-self: center;

  @media (max-width: 800px) {
    height: 20px;
    width: 20px;
    margin: 0px;
  } ;
`

export const ActivityType = styled.h1`
  text-align: left;
  align-self: center;
  font-size: 1.75rem;
  @media (max-width: 800px) {
    font-size: 0.5rem;
  } ;
`

export const ActivityName = styled.h1`
  text-align: right;
  align-self: center;
  font-size: 1.75rem;
  margin-left: auto;
  @media (max-width: 800px) {
    font-size: 1.5rem;
  } ;
`

export const FullDivider = styled.hr`
  background-color: var(--font-color);
`

export const SmallDivider = styled.hr`
  background-color: var(--font-color);
  width: 20%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`

export const StartActivityButton = styled(Button)`
  bottom: 0;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  background-color: #085454;
`

export const ButtonFooter = styled.div`
  position: sticky;
  bottom: 0;
  margin: 0;
  background-color: var(--dark-blue);
`

export const ActivityCol = styled(Col)`
  overflow-y: scroll;
  text-align: center;
`

export const HeaderRow = styled(Row)`
  width: 100%;
  margin: 0;
  background-color: var(--dark-blue);
  color: var(--font-color);
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    width: fit-content;
  }
`

export const HeaderCol = styled(Col)`
  position: sticky;
  top: 0;
  height: auto;
  background-color: var(--dark-blue);
`

export const Spacer = styled.div`
  height: 5vh;
`
