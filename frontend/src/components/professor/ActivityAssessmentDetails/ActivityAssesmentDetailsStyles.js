import styled from 'styled-components'
import { Button, Col, Row } from 'react-bootstrap'

export const PointsRow = styled(Row)`
  align-items: center;
  justify-content: space-around;
  width: 30%;
  margin: 0 auto;
  text-align: center;
  padding: 10px;

  @media (max-width: 575px) {
    width: 100%;
  }
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

  @media (max-width: 575px) {
    width: 100%;
  }
`

export const RemarksTextArea = styled.textarea`
  width: 100%;
  padding: 3px;
  max-height: 220px;
  margin: 0 auto;
  color: ${(props) => props.$fontColor};
  border: 1px solid ${(props) => props.$borderColor};
  background-color: ${(props) => props.$background};
`

export const ActivityAssessmentStudentFileRow = styled(Row)`
  margin: 0 auto;
  width: 80%;
`

export const ActivityAssessmentProfessorFileCol = styled(Col)`
  background-color: ${(props) => props.$background};
  color: ${(props) => props.$fontColor};
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;
`
