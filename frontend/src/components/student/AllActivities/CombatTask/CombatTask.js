import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Content } from '../../../App/AppGeneralStyles'
import Loader from '../../../general/Loader/Loader'
import { InfoContainer } from '../ExpeditionTask/ActivityInfo/InfoContainer'
import {
  ActivityCol,
  ActivityImg,
  ActivityName,
  ActivityType,
  FullDivider,
  HeaderCol,
  HeaderRow,
  SmallDivider
} from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { getActivityImg, getActivityTypeName } from '../../../../utils/constants'
import FileService from './FileService'
import {
  RemarksCol,
  RemarksTextArea
} from '../../../professor/ActivityAssessmentDetails/ActivityAssesmentDetailsStyles'
import { SendTaskButton } from './CombatTaskStyles'
import CombatTaskService from '../../../../services/combatTask.service'

export default function CombatTask() {
  const location = useLocation()
  const { activityId: taskState } = location.state

  const [task, setTask] = useState()
  const [taskId, setTaskId] = useState(taskState)
  const [fileString, setFileString] = useState()
  const [fileName, setFileName] = useState()
  const [answer, setAnswer] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    CombatTaskService.getCombatTask(taskId)
      .then((response) => setTask(response))
      .catch((error) => console.log(error))
  }, [taskId, isSaved])

  const sendAnswer = () => {
    //use endpoint to save file task answer
    setIsSaved(false)
    CombatTaskService.saveCombatTaskAnswer(taskId, answer, fileName, fileString).then((response) => {
      setTaskId(response)
      setIsSaved(true)
    })
  }

  const handleAnswerChange = (event) => setAnswer(event.target.value)

  return (
    <Content>
      <InfoContainer fluid className='p-0'>
        {!task ? (
          <Loader />
        ) : (
          <ActivityCol className='invisible-scroll'>
            <HeaderCol>
              <HeaderRow>
                <ActivityImg src={getActivityImg('TASK')}></ActivityImg>
                <ActivityType>{getActivityTypeName('TASK')}</ActivityType>
                <ActivityName>{task.name}</ActivityName>
              </HeaderRow>
              <FullDivider />
            </HeaderCol>
            <div>
              <h5>{task.description}</h5>
              <SmallDivider />
              <p>
                Zdobyte punkty: <strong>50 / 100</strong> {/*//TODO: info from endpoint*/}
              </p>
              <p>
                <strong>Uwagi prowadzącego:</strong> <br /> Zabrakło mi kilku rzeczy, zaznaczyłem w pliku co mi się nie
                podoba. Proszę sobie pobrać i sprawdzić {/*//TODO: info from endpoint*/}
              </p>
              <SmallDivider />
              <RemarksCol>
                <h4>Odpowiedź:</h4>
                <RemarksTextArea value={answer} onChange={handleAnswerChange} />
              </RemarksCol>

              <FileService task={task} setFile={setFileString} setFileName={setFileName} setIsSaved={setIsSaved} />
            </div>
            <SendTaskButton disabled={!fileName && answer === ''} onClick={() => sendAnswer()}>
              Wyślij
            </SendTaskButton>
          </ActivityCol>
        )}
      </InfoContainer>
    </Content>
  )
}
