import React, { useState, useEffect } from 'react'
import SuperPowerTrigger from '../SuperPowerTrigger'
import { EXPEDITION_STATUS } from '../../../../../../utils/constants'
import { ShootingPanel } from '../SuperPowerStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsToDot } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

// TODO: custom hook for all hero types for checking usage is possible
function WizardSuperPower(props) {
  const isExpanded = props.sidebar.isExpanded

  const [isShootingPanelDisplayed, setIsShootingPanelDisplayed] = useState(false)
  const [chosenQuestionId, setChosenQuestionId] = useState(null)
  const [superPowerCanBeUsed, setSuperPowerCanBeUsed] = useState(undefined)
  const [superPowerInfo, setSuperPowerInfo] = useState(undefined)

  useEffect(() => {
    if (props.status === EXPEDITION_STATUS.CHOOSE) {
      props
        .useCheck()
        .then((response) => {
          setSuperPowerCanBeUsed(response)
        })
        .catch(() => {
          setSuperPowerCanBeUsed(null)
        })
    } else {
      setSuperPowerCanBeUsed({ canBeUsed: false, message: 'Moc może być użyta tylko w wyborze pytania.' })
    }
  }, [props, superPowerInfo])

  useEffect(() => {
    if (superPowerInfo?.value) {
      /* We have to save question type in localStorage because:
       *   - generateDoor function has to display this value
       *   - after refreshing the page, we would lose this value and the power has already been used up
       */
      localStorage.setItem('questionPoints', JSON.stringify({ id: chosenQuestionId, type: superPowerInfo.value }))
    }
  }, [chosenQuestionId, props, superPowerInfo])

  const startUsingSuperPower = () => {
    if (!superPowerCanBeUsed?.canBeUsed) {
      return
    }
    setIsShootingPanelDisplayed(true)
  }

  const showQuestionPoint = (questionId) => {
    setChosenQuestionId(questionId)
    props
      .usePower(questionId)
      .then((response) => {
        setSuperPowerInfo(response)
        setIsShootingPanelDisplayed(false)
      })
      .catch(() => {
        setSuperPowerInfo(null)
      })
  }

  return (
    <>
      <SuperPowerTrigger superPowerCanBeUsed={superPowerCanBeUsed} startSuperPower={startUsingSuperPower} />
      <ShootingPanel style={{ display: isShootingPanelDisplayed ? 'flex' : 'none' }} $isExpanded={isExpanded}>
        <Row className='m-0 justify-content-between w-100'>
          {props.questions?.map((question) => (
            <Col className={'text-center'} key={question.id}>
              <FontAwesomeIcon icon={faArrowsToDot} onClick={() => showQuestionPoint(question.id)} />
            </Col>
          ))}
        </Row>

        <Button onClick={() => setIsShootingPanelDisplayed(false)}>Anuluj</Button>
      </ShootingPanel>
    </>
  )
}

function mapStateToProps(state) {
  const sidebar = state.sidebar
  const theme = state.theme

  return {
    sidebar,
    theme
  }
}
export default connect(mapStateToProps)(WizardSuperPower)
