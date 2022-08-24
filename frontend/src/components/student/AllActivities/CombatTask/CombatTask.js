import React, { useEffect, useMemo, useState, useRef } from 'react'
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
import { ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../../utils/constants'
import FileService from './FileService'
import {
  RemarksCol,
  RemarksTextArea
} from '../../../professor/ActivityAssessmentDetails/ActivityAssesmentDetailsStyles'
import { SendTaskButton } from './CombatTaskStyles'
import CombatTaskService from '../../../../services/combatTask.service'
import { Spinner, Row, Col } from 'react-bootstrap'
import FeedbackFileService from './FeedbackFileService'
import { debounce } from 'lodash'
import GameCard from '../../GameCardPage/GameCard'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CombatTask() {
  const location = useLocation()
  const { activityId: taskState } = location.state

  const [task, setTask] = useState(undefined)
  const [fileBlob, setFileBlob] = useState()
  const [fileName, setFileName] = useState()
  const [answer, setAnswer] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const textAreaRef = useRef(null)

  const resetStates = () => {
    setIsFetching(false)
    setFileBlob(null)
    setFileName(null)
    setAnswer('')
    textAreaRef.current.value = ''
  }

  useEffect(() => {
    CombatTaskService.getCombatTask(taskState)
      .then((response) => {
        setTask(response)
      })
      .catch(() => {
        setErrorMessage(ERROR_OCCURRED)
      })
  }, [isFetching, taskState])

  const sendAnswer = () => {
    setIsFetching(true)

    CombatTaskService.saveCombatTaskAnswer(taskState, answer, fileName, fileBlob)
      .then(() => {
        resetStates()
      })
      .catch((error) => {
        // if there is an error from the 5XX group, the object can be added anyway, so we do resetState,
        // and when an error from the 4XX group occurs, we do not clean to send again
        if (error.response?.status < 400 || error.response?.status >= 500) {
          resetStates()
        }
        setIsFetching(false)
      })
  }

  const handleAnswerChange = useMemo(
    () =>
      debounce((event) => {
        setAnswer(event.target.value)
      }, 200),
    []
  )

  const activityDetails = () => {
    return (
      <InfoContainer fluid className='p-0'>
        <HeaderCol>
          <HeaderRow>
            <ActivityImg src={getActivityImg('TASK')}></ActivityImg>
            <ActivityType>{getActivityTypeName('TASK')}</ActivityType>
            <ActivityName>{task.name}</ActivityName>
          </HeaderRow>
          <FullDivider />
          <Row>
            <div>
              <h5 className='row justify-content-center'>{task.description}</h5>
            </div>
          </Row>
        </HeaderCol>
      </InfoContainer>
    )
  }

  // const content = (
  //   <InfoContainer fluid className='p-0'>
  //     {!task && errorMessage === '' ? (
  //       <Loader />
  //     ) : errorMessage !== '' ? (
  //       <p>{errorMessage}</p>
  //     ) : (
  //       <ActivityCol className='invisible-scroll'>
  //         <HeaderCol>
  //           <HeaderRow>
  //             <ActivityImg src={getActivityImg('TASK')}></ActivityImg>
  //             <ActivityType>{getActivityTypeName('TASK')}</ActivityType>
  //             <ActivityName>{task.name}</ActivityName>
  //           </HeaderRow>
  //           <FullDivider />
  //         </HeaderCol>
  //         <div>
  //           <h5>{task.description}</h5>
  //           {task.points !== null && (
  //             <>
  //               <SmallDivider />
  //               <p>
  //                 Zdobyte punkty: <strong>{task.points}</strong>
  //               </p>
  //               <p>Uwagi od prowadzącego:</p>
  //               <p>{task.remarks ?? 'Brak uwag'}</p>
  //               {task.feedbackFile && <FeedbackFileService feedbackFile={task.feedbackFile} />}
  //             </>
  //           )}
  //           <SmallDivider />
  //           {task.points == null && (
  //             <RemarksCol>
  //               <h4>Odpowiedź:</h4>
  //               <RemarksTextArea
  //                 ref={textAreaRef}
  //                 onChange={(e) => {
  //                   handleAnswerChange(e)
  //                 }}
  //               />
  //             </RemarksCol>
  //           )}
  // <FileService
  //   task={task}
  //   setFile={setFileBlob}
  //   setFileName={setFileName}
  //   setIsFetching={setIsFetching}
  //   isFetching={isFetching}
  //   isRevieved={task.points != null}
  // />
  //         </div>
  // <SendTaskButton disabled={task.points !== null} onClick={sendAnswer}>
  //           {isFetching ? (
  //             <Spinner animation={'border'} />
  //           ) : task.points == null ? (
  //             <span>Wyślij</span>
  //           ) : (
  //             <span>Aktywność została oceniona</span>
  //           )}
  //         </SendTaskButton>
  //       </ActivityCol>
  //     )}
  //   </InfoContainer>
  // )

  {
    /* {!task && errorMessage === '' ? (
        <Loader />
      ) : errorMessage !== '' ? (
        <p>{errorMessage}</p>
      ) : (
        <Content>
          <Row className='m-0 pt-4' style={{ height: '50vh' }}>
            <Col>
              <GameCard headerText='Informacje o aktywności' content={activityDetails()} className={'h-100'} />
            </Col>

            <Col>
              <GameCard className={'h-100'} content={content} />
            </Col>
          </Row>

          <Row className='m-0 pt-4' style={{ height: '50vh' }}>
            <Col>
              <GameCard className={'h-100'} content={content} />
            </Col>
            <Col>
              <GameCard className={'h-100'} />
            </Col>
          </Row>
        </Content>
      )} */
  }

  //add overflows where needed

  const AnswerField = () => (
    <Col md={6} style={{ height: '100%', overflowY: 'auto' }}>
      <h4>Odpowiedź:</h4>
      <RemarksTextArea
        ref={textAreaRef}
        onChange={(e) => {
          handleAnswerChange(e)
        }}
      />
      <Col className={'text-center'}>
        <FileService
          task={task}
          setFile={setFileBlob}
          setFileName={setFileName}
          setIsFetching={setIsFetching}
          isFetching={isFetching}
          isRevieved={task.points != null}
        />
      </Col>
      <Col className={'w-100 text-center'}>
        <SendTaskButton disabled={task.points !== null} onClick={sendAnswer}>
          {isFetching ? (
            <Spinner animation={'border'} />
          ) : task.points == null ? (
            <span>Wyślij</span>
          ) : (
            <span>Aktywność została oceniona</span>
          )}
        </SendTaskButton>
      </Col>
    </Col>
  )

  const FeedbackField = () => (
    <Col md={6} className={'text-center p-4 my-auto'}>
      <FontAwesomeIcon className={'m-2'} icon={faHourglass} size='5x' spin />
      <h2 className={'m-2'}>Odpowiedź została przesłana, oczekiwanie na sprawdzenie przez prowadzącego</h2>
    </Col>
  )

  const content = () => {
    return !task && errorMessage === '' ? (
      <Loader />
    ) : errorMessage !== '' ? (
      <p>{errorMessage}</p>
    ) : (
      <>
        <Col style={{ height: '3vh' }} />
        <Col
          className='m-0 pt-4 mx-auto'
          style={{ height: '94vh', width: '90%', backgroundColor: 'var(--light-blue)' }}
        >
          <HeaderRow className='p-2 rounded mx-2' style={{ backgroundColor: 'var(--dark-blue)', height: '8vh' }}>
            <ActivityImg src={getActivityImg('TASK')}></ActivityImg>
            <ActivityType>{getActivityTypeName('TASK')}</ActivityType>
            <ActivityName>{task.name}</ActivityName>
          </HeaderRow>
          <Row style={{ height: '2vh' }}></Row>
          <Row className='p-2 rounded mx-2' style={{ backgroundColor: 'var(--dark-blue)', height: '25vh' }}>
            <Col>
              <h2>Treść:</h2>
              <p>{task.description}</p>
            </Col>
          </Row>
          <Row style={{ height: '2vh' }}></Row>
          <Row className='p-2 rounded mx-2' style={{ backgroundColor: 'var(--dark-blue)', height: '50vh' }}>
            {/* delegate to another component later */}
            <AnswerField />
            <FeedbackField />
          </Row>
        </Col>
        <Col style={{ height: '3vh' }} />
      </>
    )
  }

  return <Content style={{ color: 'var(--font-color)' }}>{content()}</Content>
}
