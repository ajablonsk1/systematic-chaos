import { useNavigate } from 'react-router-dom'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { Activity, ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../../../utils/constants'
import { useEffect, useMemo, useState } from 'react'

import StudentService from '../../../../../services/student.service'
import { convertSecondsToStringInfo } from '../../../../../utils/Api'
import ExpeditionService from '../../../../../services/expedition.service'
import { generateFullPath, PageRoutes } from '../../../../../routes/PageRoutes'
import { CustomTable } from '../../../GameCardPage/gameCardContentsStyle'
import moment from 'moment'
import PercentageCircle from '../../../PointsPage/ChartAndStats/PercentageCircle'
import ActivityInfoContentCard from './ActivityInfoContentCard'

export default function ActivityContent(props) {
  const navigate = useNavigate()
  const activityId = props.activityId

  const [activityScore, setActivityScore] = useState(undefined)
  const [startDate, setStartDate] = useState(undefined)
  const [endDate, setEndDate] = useState(undefined)
  const [pointsReceived, setPointsReceived] = useState(undefined)
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    ExpeditionService.getExpeditionScore(activityId)
      .then((response) => {
        setActivityScore(response || {})
      })
      .catch(() => {
        setActivityScore(null)
      })

    StudentService.getUserGroup()
      .then((activityGroup) => {
        const givenTimeData = props.activity.requirement?.accessDates.find((el) =>
          el.group.find((el) => el.name === activityGroup.name)
        )

        if (givenTimeData) {
          setStartDate(new Date(givenTimeData.dateFrom))
          setEndDate(new Date(givenTimeData.dateTo))
        } else {
          setStartDate('')
          setEndDate('')
        }
      })
      .catch(() => {
        setStartDate(null)
        setEndDate(null)
      })
  }, [activityId, props])

  useEffect(() => {
    // if activityScore from endpoint has id value, this task was finished by logged student
    if (activityScore?.id) {
      ExpeditionService.getExpeditionAllPoints(activityScore.id)
        .then((response) => {
          setPointsReceived(response ?? 0)
        })
        .catch(() => {
          setPointsReceived(null)
        })
    } else {
      setPointsReceived(0)
    }
  }, [activityScore])

  const navigateTo = (nodeId, taskResultId) =>
    navigate(
      generateFullPath(() => PageRoutes.Student.GameMap.Expedition.QUESTION_SELECTION),
      {
        state: {
          activityId: activityId,
          nodeId: nodeId,
          taskResultId: taskResultId,
          timeToSolveMillis: props.activity.timeToSolveMillis
        }
      }
    )

  const startExpedition = () => {
    setIsFetching(true)
    // returns resultId value, very important
    ExpeditionService.getTaskAnswerId(activityId)
      .then((response) => {
        // set startTime in milliseconds
        ExpeditionService.setStartTime(response?.id, Date.now())
          .then(() => {
            setIsFetching(false)
            // later get the first question on endpoint
            navigateTo(props.activity.questions[0].id, response?.id)
          })
          .catch((error) => {
            setIsFetching(false)
            setErrorMessage(error.response.data.message ?? ERROR_OCCURRED)
          })
      })
      .catch((error) => {
        setIsFetching(false)
        setErrorMessage(error.response.data.message ?? ERROR_OCCURRED)
      })
  }

  const basicInfoCard = useMemo(() => {
    if (startDate === undefined && endDate === undefined) {
      return <Spinner animation={'border'} />
    }

    if (startDate == null || endDate == null) {
      return <p>{ERROR_OCCURRED}</p>
    }

    const tableElements = [
      {
        name: 'Ikona aktywności',
        value: <img height={50} src={getActivityImg(Activity.EXPEDITION)} alt={'activity-icon'} />
      },
      { name: 'Typ aktywności', value: getActivityTypeName(Activity.EXPEDITION) },
      { name: 'Nazwa aktywności', value: props.activity.title },
      {
        name: 'Pozycja na mapie',
        value: (
          <span>
            ({props.activity.posX}, {props.activity.posY})
          </span>
        )
      },
      {
        name: 'Czas na rozwiązanie aktywności',
        value: <span>{props.activity.timeToSolveMillis / 1000 / 60} min</span>
      },
      {
        name: 'Data dostępności aktywności',
        value:
          startDate && endDate ? (
            <span>
              {moment(startDate).format('DD.MM.YYYY, HH:mm')} - {moment(endDate).format('DD.MM.YYYY, HH:mm')}
            </span>
          ) : (
            <span>Brak limitu czasowego</span>
          )
      },
      {
        name: 'Pozostały czas na rozwiązanie zadania',
        value: startDate && endDate ? convertSecondsToStringInfo(endDate) : '-'
      }
    ]

    return (
      <CustomTable>
        <tbody>
          {tableElements.map((row, index) => (
            <tr key={index + Date.now()}>
              <td>{row.name}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </CustomTable>
    )
  }, [endDate, props, startDate])

  const pointsCard = useMemo(() => {
    if (pointsReceived === undefined) {
      return <Spinner animation={'border'} />
    }

    if (pointsReceived == null) {
      return <p>{ERROR_OCCURRED}</p>
    }

    const tableElements = [
      { name: 'Obecna liczba punktów', value: pointsReceived },
      { name: 'Maksymalna liczba punktów do zdobycia', value: props.activity.maxPoints },
      { name: 'Liczba punktów licząca się jako 100%', value: props.activity.maxPoints100 ?? '-' }
    ]

    return (
      <Row className={'h-100 m-0 p-0'}>
        <Col md={6} className={'pt-4'}>
          <CustomTable>
            <tbody>
              {tableElements.map((row, index) => (
                <tr key={index + Date.now()}>
                  <td>{row.name}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </Col>
        <Col md={6}>
          <PercentageCircle
            percentageValue={(100 * pointsReceived) / props.activity.maxPoints}
            points={pointsReceived}
            maxPoints={props.activity.maxPoints} // TODO: replace it with props.activity.maxPoints 100 when backend will be work appropriately
          />
        </Col>
      </Row>
    )
  }, [pointsReceived, props])

  return (
    <Row className={'m-0 vh-100'}>
      <Col md={6}>
        <Row className={'h-50 py-2 px-2'}>
          <ActivityInfoContentCard header={'Podstawowe informacje'} body={basicInfoCard} />
        </Row>
        <Row className={'h-50 py-2 px-2'}>
          <ActivityInfoContentCard header={'Informacje punktowe'} body={pointsCard} />
        </Row>
      </Col>
      <Col md={6}>
        <Row className={'h-50 py-2 px-2'}>
          <ActivityInfoContentCard header={'Opis aktywności'} body={<p>{props.activity.description}</p>} />
        </Row>
        <Row className={'py-2 px-2'} style={{ height: '44vh' }}>
          <ActivityInfoContentCard
            header={'Wymagana wiedza'}
            body={<p>{props.activity.requiredKnowledge ?? 'Brak wymagań'}</p>}
          />
        </Row>
        <Row className={'justify-content-center align-items-start gap-2 py-2 px-2'} style={{ height: '5vh' }}>
          <Button
            className={'w-auto'}
            variant={'secondary'}
            onClick={() => navigate(generateFullPath(() => PageRoutes.Student.GameMap.GAME_MAP))}
          >
            Wstecz
          </Button>
          <Button className={'w-auto'} variant={'warning'} onClick={startExpedition} disabled={activityScore?.id}>
            {isFetching ? <Spinner animation={'border'} /> : <span>Rozpocznij</span>}
          </Button>
        </Row>
        {!!errorMessage && <p className={'text-center text-danger pt-2 text-truncate'}>{errorMessage}</p>}
      </Col>
    </Row>
  )
}
