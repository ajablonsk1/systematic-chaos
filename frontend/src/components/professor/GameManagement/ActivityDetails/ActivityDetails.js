import React, { useEffect, useState } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { TabsContainer } from '../../ParticipantsPage/ParticipantsStyles'
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, Tab } from 'react-bootstrap'
import Ranking from '../../../general/Ranking/Ranking'
import { debounce } from 'lodash/function'
import ActivityService from '../../../../services/activity.service'
import { useLocation } from 'react-router-dom'
import ActivityStats from './ActivityStats'
import ActivityRequirements from './ActivityRequirements/ActivityRequirements'
import { connect } from 'react-redux'
import { isMobileView } from '../../../../utils/mobileHelper'

function ActivityDetails(props) {
  const location = useLocation()
  const { activityId, activityType, isBlocked } = location.state

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
      .catch(() => {})
    setStudentsList(null)
    setFilteredList(null)
  }, [activityId])

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
            customHeight={'80vh'}
            noPointsMessage={'Nie wykonano'}
            iconCallback={(student) => {
              setIsStudentAnswerModalOpen(true)
              setChosenStudent(student)
            }}
          />
        </Tab>
        <Tab eventKey={'statistics'} title={'Statystyki'}>
          <ActivityStats activityId={activityId} activityType={activityType} />
        </Tab>
        <Tab eventKey={'requirements'} title={'Wymagania'}>
          <ActivityRequirements activityId={activityId} isBlocked={isBlocked} />
        </Tab>
      </TabsContainer>
      <Modal show={isStudentAnswerModalOpen} onHide={() => setIsStudentAnswerModalOpen(false)} size={'lg'}>
        <ModalHeader>
          <h5>Odpowiedź studenta{chosenStudent ? `: ${chosenStudent.firstName} ${chosenStudent.lastName}` : ''}</h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: '80vh', overflow: 'auto' }}>
          <div>
            <h6>Ocena: </h6>
            <p>2/5</p>
          </div>
          <div>
            <h6>Odpowiedź:</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio ducimus exercitationem fuga hic, id,
              ipsa ipsam iure minima, nam nisi odio perspiciatis porro quas quia quisquam recusandae rerum sit ut
            </p>
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
