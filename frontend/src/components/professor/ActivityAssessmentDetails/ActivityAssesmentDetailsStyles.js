import styled from 'styled-components'
import { Button, Col, Row } from 'react-bootstrap'

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
  color: ${(props) => props.$fontColor};
  border: 1px solid ${(props) => props.$borderColor};
  background-color: ${(props) => props.$background};
`

export const PointsMax = styled.p`
  top: 50%;
  position: relative;
  margin: 0;
  margin-left: 5px;
  width: fit-content;
`

export const AcceptButton = styled(Button)`
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 15px;
  background-color: ${(props) => props.$background};
  border-color: ${(props) => props.$background};

  :disabled {
    background-color: ${(props) => props.$background};
    border-color: ${(props) => props.$background};
    opacity: 0.6;
  }

  &:hover {
    background-color: ${(props) => props.$background};
    border-color: ${(props) => props.$background};
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
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;
`
