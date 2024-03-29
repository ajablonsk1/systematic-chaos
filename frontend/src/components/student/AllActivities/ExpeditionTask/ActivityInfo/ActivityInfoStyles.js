import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'

export const ActivityImg = styled.img`
  height: 30px;
  width: 30px;
  padding: 0;
  margin: 0 10px;
  align-self: center;

  @media (max-width: 800px) {
    height: 20px;
    width: 20px;
    margin: 0;
  } ;
`

export const ActivityType = styled.h1`
  text-align: left;
  align-self: center;
  font-size: 1.75rem;

  @media (max-width: 800px) {
    font-size: 0.9rem;
  }
`

export const ActivityName = styled.h1`
  text-align: right;
  align-self: center;
  font-size: 1.75rem;
  margin-left: auto;

  @media (max-width: 800px) {
    font-size: 1.5rem;
  }

  @media (max-width: 575px) {
    margin-left: 0;
  }
`

export const FullDivider = styled.hr`
  background-color: ${(props) => props.$background};
`

export const SmallDivider = styled.hr`
  background-color: ${(props) => props.$background};
  width: 20%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`

export const ActivityCol = styled(Col)`
  overflow-y: scroll;
  text-align: center;
`

export const HeaderRow = styled(Row)`
  width: 100%;
  margin: 0;
  background-color: ${(props) => props.$background};
  color: ${(props) => props.$fontColor};
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    width: auto;
  }
`

export const HeaderCol = styled(Col)`
  position: sticky;
  top: 0;
  height: auto;
  background-color: ${(props) => props.$background};
`
