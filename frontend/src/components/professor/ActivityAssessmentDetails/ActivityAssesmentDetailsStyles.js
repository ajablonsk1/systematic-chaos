import styled from 'styled-components'
import { Button, Col, Row } from 'react-bootstrap'

export const HeaderRow = styled(Row)`
  background-color: var(--dark-blue);
  color: var(--font-color);
`

export const ActivityImg = styled.img`
  height: 40px;
  width: 40px;
  margin: 10px;

  @media (max-width: 800px) {
    height: 20px;
    width: 20px;
    margin: 5px;
  } ;
`

export const ActivityType = styled.h1`
  text-align: left;
  @media (max-width: 800px) {
    font-size: 1.5rem;
  } ;
`

export const ActivityName = styled.h1`
  text-align: right;
  margin-left: auto;
  @media (max-width: 800px) {
    font-size: 1.5rem;
  } ;
`

export const PointsRow = styled(Row)`
  align-items: center;
  justify-content: space-around;
  width: 30%;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
`

export const PointsInput = styled.input`
  width: 50px;
  color: var(--font-color);
  border: 1px solid var(--font-color);
  background-color: var(--dark-blue);
`

export const PointsMax = styled.p`
  top: 50%;
  position: relative;
  margin: 0;
  margin-left: 5px;
`

export const AcceptButton = styled(Button)`
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 15px;
  background-color: var(--button-green);
  border-color: var(--button-green);
  :disabled {
    background-color: var(--button-green);
    border-color: var(--button-green);
    opacity: 0.6;
  }
`

export const RemarksTextArea = styled.textarea`
  width: 100%;
  padding: 3px;
  max-height: 220px;
  margin: 0 auto;
  color: var(--font-color);
  border: 1px solid var(--font-color);
  background-color: var(--light-blue);
`

export const ActivityAssessmentStudentFileRow = styled(Row)`
  margin: 0 auto;
  width: 80%;
`

export const ActivityAssesmentProfessorFileCol = styled(Col)`
  background-color: var(--dark-blue);
  color: var(--font-color);
  margin: 10px auto auto auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
`
