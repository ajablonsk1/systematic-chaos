import { Col, Row } from 'react-bootstrap'
import PercentageCircle from '../PointsPage/ChartAndStats/PercentageCircle'
import React from 'react'
import { ChartCol, CustomTable } from './gameCardContentsStyle'
import { convertHeroTypeToPlayerType, getActivityTypeName, getGameCardInfo, HeroImg } from '../../../utils/constants'
import { HeroType, PlayerType } from '../../../utils/userRole'
import { Bar, Pie } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { barConfig, pieConfig } from '../../../utils/chartConfig'
import moment from 'moment'
import { colorPalette } from '../../general/chartHelper'

export const GradesStatsContent = (props) => {
  const {
    allPoints = 0,
    maxPoints = 0,
    avgGraphTask = 0,
    avgFileTask = 0,
    surveysNumber = 0,
    graphTaskPoints = 0,
    fileTaskPoints = 0
  } = props.stats
  const percentageValue = allPoints && maxPoints ? Math.round(100 * (allPoints / maxPoints)) : 0

  return (
    <Row className={'h-100 d-flex justify-content-center align-items-center'}>
      <Col md={7}>
        <p>Średni wynik z ekspedycji: {avgGraphTask}%</p>
        <p>Średni wynik z zadań bojowych: {avgFileTask}%</p>
        <p>Ilość wykonanych sondaży: {surveysNumber}</p>
        <p>Punkty zdobyte w ekspedycjach: {graphTaskPoints}</p>
        <p>Punkty zdobyte w zadaniach bojowych: {fileTaskPoints}</p>
      </Col>
      <Col md={5}>
        <PercentageCircle percentageValue={percentageValue} points={allPoints} maxPoints={maxPoints} />
      </Col>
    </Row>
  )
}

export const LastActivitiesContent = (props) => {
  return (
    <CustomTable>
      <thead>
        <tr>
          <th>Rozdział</th>
          <th>Aktywność</th>
          <th>Punkty</th>
          <th>Dostępne do</th>
        </tr>
      </thead>
      <tbody>
        {props.stats.map((activity, index) => (
          <tr key={index + Date.now()}>
            <td>{activity.chapterName}</td>
            <td>{getActivityTypeName(activity.activityType)}</td>
            <td>{activity.points}</td>
            <td>
              {activity.availableUntil ? moment(activity.availableUntil).format('DD.MM.YYYY') : 'Bez limitu czasowego'}
            </td>
          </tr>
        ))}
      </tbody>
    </CustomTable>
  )
}

export const HeroStatsContent = (props) => {
  const {
    heroType = '',
    experiencePoints = 0,
    nextLvlPoints = 0,
    rankName = '',
    badgesNumber = 0,
    completedActivities = 0
  } = props.stats

  return (
    <Row className={'h-100 d-flex justify-content-center align-items-center'}>
      <Col md={6} className={'h-100'}>
        <img style={{ maxWidth: '100%' }} height={'90%'} src={HeroImg[heroType]} alt={'Your hero'} />
      </Col>
      <Col md={6}>
        <p>Punkty doświadczenia: {experiencePoints}</p>
        <p>Punkty do kolejnej rangi: {nextLvlPoints}</p>
        <p>Ranga: {rankName}</p>
        <p>Zdobytych medali: {badgesNumber}</p>
        <p>Wykonanych aktywności: {completedActivities}</p>
      </Col>
    </Row>
  )
}

export const PersonalRankingInfoContent = (props) => {
  const userPointsGroup = Math.ceil((props.stats.rankPosition / props.stats.rankLength) * 100)
  const playerType = convertHeroTypeToPlayerType(props.stats.heroType)
  const chartType = playerType === PlayerType.CHALLENGING ? 'BAR' : 'PIE'

  const rankComment = getGameCardInfo(playerType, {
    rankPosition: props.stats.rankPosition,
    rankLength: props.stats.rankLength,
    userPoints: userPointsGroup
  })

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

  const getChartInfo = () => {
    if (chartType === 'BAR') {
      const barLabels = [
        props.stats.betterPlayerPoints != null ? 'Punkty gracza przed Tobą' : '',
        'Twój wynik',
        props.stats.worsePlayerPoints != null ? 'Punkty gracza za Tobą' : ''
      ].filter((label) => !!label)

      const barPoints = [props.stats.betterPlayerPoints, props.stats.userPoints, props.stats.worsePlayerPoints].filter(
        (points) => points != null
      )
      return barConfig(barLabels, barPoints, colorPalette(barLabels.length))
    }

    return pieConfig(
      ['Grupa graczy, w której jesteś', 'Pozostali gracze'],
      [props.stats.rankPosition, props.stats.rankLength],
      colorPalette(2)
    )
  }

  const { data, options } = getChartInfo()

  return (
    <Row className={'h-100 d-flex justify-content-center align-items-center'}>
      <ChartCol md={12}>
        {chartType === 'BAR' ? <Bar data={data} options={options} /> : <Pie data={data} options={options} />}
      </ChartCol>
      <Col md={12}>
        <p className={'text-center w-100'}>{rankComment}</p>
      </Col>
    </Row>
  )
}
