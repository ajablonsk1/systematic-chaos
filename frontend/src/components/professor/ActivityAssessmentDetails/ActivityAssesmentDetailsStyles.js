import styled from 'styled-components'
import { Button, Col, Row } from 'react-bootstrap'

export const ContentCol = styled(Col)`
  padding-top: 15px;
  margin: 0 auto;
`

export const ActivityTitle = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 5px;
  background-color: var(--dark-blue);
  color: var(--font-color);
`

export const TopInfo = styled(Row)`
  justify-content: space-around;
  padding-top: 6px;
  max-width: 1500px;
  margin: 0 auto;
  color: var(--font-color);
  /* height: 200px; */
`

export const TopInfoCard = styled.div`
  background-color: var(--dark-blue);
  width: 740px;
  margin-top: 5px;
  padding: 10px;
  //tak, wiem - ale to chyba najprostszy sposób na zrobienie tego, przy czym nie jest absolutnym koszmarem
  @media (max-width: 1800px) {
    width: 1500px;
  }
  height: 180px;
`

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  padding-left: 10px;
  height: 100px;
`

export const ActivityInfo = styled.p`
  overflow-y: auto;
`

export const AnswerRow = styled(Row)`
  width: 100%;
  min-height: 200px;
  max-height: 500px;
  background-color: var(--dark-blue);
  margin: 10px auto 0 auto;
`

export const AnswerContent = styled.p`
  overflow-y: auto;
`

export const AnswerCol = styled(Col)`
  margin-top: 20px;
  color: var(--font-color);
  text-align: center;
  margin-bottom: 10px;
  max-height: 220px;
  overflow-y: scroll;
`

export const RemarksCol = styled(Col)`
  width: 100%;
  min-height: 140px;
  max-height: 300px;
  background-color: var(--dark-blue);
  margin: 10px auto 0 auto;
  color: var(--font-color);
  padding-bottom: 5px;
`

export const PointsRow = styled(Row)`
  align-items: center;
  display: flex;
  justify-content: space-around;
  background-color: var(--dark-blue);
  width: 30%;
  margin: 10px auto 0 auto;
  text-align: center;
  color: var(--font-color);
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
`

export const RemarksTextArea = styled.textarea`
  width: 100%;
  padding: 3px;
  max-height: 220px;
  margin: 0 auto;
  color: var(--font-color);
  border: 1px solid var(--font-color);
  background-color: var(--dark-blue);
`

export const RemainingCount = styled.p`
  background-color: var(--dark-blue);
  color: var(--font-color);
  padding: 10px;
  width: 35%;
  text-align: center;
  position: relative;
  margin: 20px 0 5px 65%;
`

export const ActivityAssessmentStudentFileRow = styled(Row)`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`

export const ActivityAssesmentProfessorFileCol = styled(Col)`
  background-color: var(--dark-blue);
  color: var(--font-color);
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width: 80%;
  display: flex;
  flex-flow: column;
  text-align: center;
  padding: 20px;
`
