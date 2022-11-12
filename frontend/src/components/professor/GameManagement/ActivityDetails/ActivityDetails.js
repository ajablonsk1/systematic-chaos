import React, { useEffect, useState } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { TabsContainer } from '../../ParticipantsPage/ParticipantsStyles'
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, Tab } from 'react-bootstrap'
import Ranking from '../../../general/Ranking/Ranking'
import { debounce } from 'lodash/function'
import ActivityService from '../../../../services/activity.service'
import { useLocation } from 'react-router-dom'
import ActivityStats from './ActivityStats'
import { connect } from 'react-redux'
import { isMobileView } from '../../../../utils/mobileHelper'
import Requirements from '../Requirements/Requirements'
import { Activity } from '../../../../utils/constants'
import GoBackButton from '../../../general/GoBackButton/GoBackButton'
import { TeacherRoutes } from '../../../../routes/PageRoutes'

function ActivityDetails(props) {
  const location = useLocation()
  const { activityId, activityType, chapterName, chapterId } = location.state

  const [studentsList, setStudentsList] = useState(undefined)
  const [filteredList, setFilteredList] = useState(undefined)
  const [filterQuery, setFilterQuery] = useState(undefined)
  const [isStudentAnswerModalOpen, setIsStudentAnswerModalOpen] = useState(false)
  const [chosenStudent, setChosenStudent] = useState(null)

  useEffect(() => {
    ActivityService.getStudentsResultList(activityId)
      .then((response) => {
        setStudentsList(response)
        setFilteredList(response)
      })
      .catch(() => {
        setStudentsList(null)
        setFilteredList(null)
      })
  }, [activityId, activityType])

  useEffect(() => {
    if (filterQuery) {
      ActivityService.getFilteredStudentsResultList(activityId, filterQuery)
        .then((response) => {
          setFilteredList(response)
        })
        .catch(() => {
          setFilteredList(null)
        })
    } else {
      setFilteredList(studentsList)
    }
  }, [filterQuery, studentsList, activityId])

  const filterList = debounce((query) => {
    setFilterQuery(query)
  }, 300)

  return (
    <Content style={{ marginBottom: isMobileView() ? 70 : 0 }}>
      <TabsContainer
        $background={props.theme.success}
        $fontColor={props.theme.background}
        $linkColor={props.theme.primary}
        defaultActiveKey={'results'}
      >
        <Tab eventKey={'results'} title={'Wyniki'}>
          <Form.Group className={'py-3 px-4'}>
            <Form.Control
              type={'text'}
              placeholder={'Wyszukaj po grupie lub studencie lub typie bohatera...'}
              onChange={(e) => filterList(e.target.value)}
            />
          </Form.Group>

          <Ranking
            rankingList={filteredList}
            customHeight={'75vh'}
            noPointsMessage={'Nie wykonano'}
            iconCallback={
              activityType === Activity.SURVEY
                ? (student) => {
                    setIsStudentAnswerModalOpen(true)
                    setChosenStudent(student)
                  }
                : null
            }
          />
          <GoBackButton goTo={TeacherRoutes.GAME_MANAGEMENT.CHAPTER.MAIN + `/${chapterName}/${chapterId}`} />
        </Tab>
        <Tab eventKey={'statistics'} title={'Statystyki'}>
          <ActivityStats activityId={activityId} activityType={activityType} />
          <GoBackButton goTo={TeacherRoutes.GAME_MANAGEMENT.CHAPTER.MAIN + `/${chapterName}/${chapterId}`} />
        </Tab>
        <Tab eventKey={'requirements'} title={'Wymagania'}>
          <Requirements
            id={activityId}
            getRequirementsCallback={ActivityService.getActivityRequirements}
            updateRequirementsCallback={ActivityService.setActivityRequirements}
            tableTitle={
              'Lista wymagań, które student musi spełnić, żeby odblokować możliwość wykonania tej aktywności:'
            }
            chapterDetails={{ chapterName, chapterId }}
          />
        </Tab>
      </TabsContainer>
      <Modal show={isStudentAnswerModalOpen} onHide={() => setIsStudentAnswerModalOpen(false)} size={'lg'}>
        <ModalHeader>
          <h5>Odpowiedź studenta{chosenStudent ? `: ${chosenStudent.firstName} ${chosenStudent.lastName}` : ''}</h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: '80vh', overflow: 'auto' }}>
          <div>
            <h6>Ocena od studenta: </h6>
            <p>{chosenStudent?.studentAnswer?.studentPoints ?? '-'}/5</p>
          </div>
          <div>
            <h6>Odpowiedź:</h6>
            <p>{chosenStudent?.studentAnswer?.answer ?? '-'}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
            onClick={() => setIsStudentAnswerModalOpen(false)}
          >
            Zamknij
          </Button>
        </ModalFooter>
      </Modal>
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(ActivityDetails)
