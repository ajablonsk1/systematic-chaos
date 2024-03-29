import { useNavigate } from 'react-router-dom'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { Activity, ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../../../utils/constants'
import { useEffect, useMemo, useState } from 'react'
import { convertDateToStringInfo } from '../../../../../utils/Api'
import ExpeditionService from '../../../../../services/expedition.service'
import { CustomTable } from '../../../GameCardPage/gameCardContentsStyle'
import moment from 'moment'
import PercentageCircle from '../../../PointsPage/ChartAndStats/PercentageCircle'
import ActivityInfoContentCard from './ActivityInfoContentCard'
import { StudentRoutes } from '../../../../../routes/PageRoutes'
import { connect } from 'react-redux'
import { isMobileView } from '../../../../../utils/mobileHelper'

function ActivityContent(props) {
  const isMobileDisplay = isMobileView()
  const navigate = useNavigate()
  const activityId = props.activityId
  const [startDate, setStartDate] = useState(undefined)
  const [endDate, setEndDate] = useState(undefined)
  const [activityScore, setActivityScore] = useState(undefined)
  const [pointsReceived, setPointsReceived] = useState(undefined)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    ExpeditionService.getExpeditionScore(activityId)
      .then((response) => {
        setActivityScore(response || -1)
      })
      .catch(() => {
        setActivityScore(null)
      })
    const startDateGiven = props.activity.requirements?.find((el) => el.dateFromMillis && el.selected)
    setStartDate(startDateGiven?.dateFromMillis ?? null)
    const endDateGiven = props.activity.requirements?.find((el) => el.dateToMillis && el.selected) ?? null
    setEndDate(endDateGiven?.dateToMillis ?? null)
  }, [activityId, props])

  useEffect(() => {
    // if activityScore from endpoint has id value, this task was finished by logged student
    if (activityScore && activityScore !== -1) {
      ExpeditionService.getExpeditionAllPoints(activityScore)
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

  const navigateToExpeditionWrapper = () =>
    navigate(StudentRoutes.GAME_MAP.GRAPH_TASK.EXPEDITION_WRAPPER, {
      state: {
        activityId: activityId,
        maxPoints: props.activity.maxPoints
      }
    })

  const startExpedition = () => {
    //necessary?
    setIsFetching(true)
    navigateToExpeditionWrapper()
  }

  const basicInfoCard = useMemo(() => {
    if (startDate === undefined && endDate === undefined) {
      return <Spinner animation={'border'} />
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
        value: startDate && endDate ? convertDateToStringInfo(endDate) : '-'
      }
    ]

    return (
      <CustomTable $fontColor={props.theme.font} $borderColor={props.theme.primary} $background={props.theme.secondary}>
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
      { name: 'Obecna liczba punktów', value: pointsReceived !== '' ? pointsReceived : 0 },
      { name: 'Maksymalna liczba punktów do zdobycia', value: props.activity.maxPoints }
    ]

    return (
      <Row className={'h-100 m-0 p-0'}>
        <Col md={6} className={'pt-4'}>
          <CustomTable
            $fontColor={props.theme.font}
            $borderColor={props.theme.primary}
            $background={props.theme.secondary}
          >
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
            points={pointsReceived !== '' ? pointsReceived : 0}
            maxPoints={props.activity.maxPoints} // TODO: replace it with props.activity.maxPoints 100 when backend will be work appropriately
          />
        </Col>
      </Row>
    )
  }, [pointsReceived, props])

  return (
    <Row style={{ height: isMobileDisplay ? 'auto' : '100vh', margin: isMobileDisplay ? '0 0 85px 0' : 0 }}>
      <Col md={6}>
        <Row className={`${isMobileDisplay ? 'h-auto' : 'h-50'} py-2 px-2`}>
          <ActivityInfoContentCard header={'Podstawowe informacje'} body={basicInfoCard} />
        </Row>
        <Row className={`${isMobileDisplay ? 'h-auto' : 'h-50'} py-2 px-2`}>
          <ActivityInfoContentCard header={'Informacje punktowe'} body={pointsCard} />
        </Row>
      </Col>
      <Col md={6}>
        <Row className={`${isMobileDisplay ? 'h-auto' : 'h-50'} py-2 px-2`}>
          <ActivityInfoContentCard header={'Opis aktywności'} body={<p>{props.activity.description}</p>} />
        </Row>
        <Row className={'py-2 px-2'} style={{ height: isMobileDisplay ? 'auto' : '44vh' }}>
          <ActivityInfoContentCard
            header={'Wymagana wiedza'}
            body={<p>{props.activity.requiredKnowledge ?? 'Brak wymagań'}</p>}
          />
        </Row>
        <Row className={'justify-content-center align-items-start gap-2 py-2 px-2'} style={{ height: '5vh' }}>
          <Button
            className={'w-auto'}
            style={{ backgroundColor: props.theme.secondary, borderColor: props.theme.secondary }}
            onClick={() => navigate(StudentRoutes.GAME_MAP.MAIN)}
          >
            Wstecz
          </Button>
          {/* we don't need to disable the button anymore, as we can try to continue with the server-side flow rework */}
          <Button
            className={'w-auto'}
            style={{ backgroundColor: props.theme.warning, borderColor: props.theme.warning }}
            onClick={startExpedition}
          >
            {isFetching ? <Spinner animation={'border'} size={'sm'} /> : <span>Rozpocznij</span>}
          </Button>
        </Row>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ActivityContent)
