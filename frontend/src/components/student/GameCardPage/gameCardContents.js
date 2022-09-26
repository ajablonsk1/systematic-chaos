import { Col, Row } from 'react-bootstrap'
import PercentageCircle from '../PointsPage/ChartAndStats/PercentageCircle'
import React from 'react'
import { ChartCol, CustomTable } from './gameCardContentsStyle'
import { convertHeroTypeToPlayerType, getActivityTypeName, getGameCardInfo, HeroImg } from '../../../utils/constants'
import { PlayerType } from '../../../utils/userRole'
import { Bar, Pie } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { barConfig, pieConfig } from '../../../utils/chartConfig'
import moment from 'moment'
import { colorPalette } from '../../general/chartHelper'

export const GradesStatsContent = (props) => {
  const percentageValue =
    props.stats.allPoints && props.stats.maxPoints
      ? Math.round(100 * (props.stats.allPoints / props.stats.maxPoints))
      : 0

  return (
    <Row className={'h-100 d-flex justify-content-center align-items-center'}>
      <Col md={7}>
        <p>Średni wynik z ekspedycji: {props.stats.avgGraphTask ?? 0}%</p>
        <p>Średni wynik z zadań bojowych: {props.stats.avgFileTask ?? 0}%</p>
        <p>Ilość wykonanych sondaży: {props.stats.surveysNumber ?? 0}</p>
        <p>Punkty zdobyte w ekspedycjach: {props.stats.graphTaskPoints ?? 0}</p>
        <p>Punkty zdobyte w zadaniach bojowych: {props.stats.fileTaskPoints ?? 0}</p>
      </Col>
      <Col md={5}>
        <PercentageCircle
          percentageValue={percentageValue}
          points={props.stats.allPoints}
          maxPoints={props.stats.maxPoints}
        />
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
  return (
    <Row className={'h-100 d-flex justify-content-center align-items-center'}>
      <Col md={6} className={'h-100'}>
        <img style={{ maxWidth: '100%' }} height={'90%'} src={HeroImg[props.stats.heroType]} alt={'Your hero'} />
      </Col>
      <Col md={6}>
        <p>Punkty doświadczenia: {props.stats.experiencePoints}</p>
        <p>Punkty do kolejnej rangi: {props.stats.nextLvlPoints}</p>
        <p>Ranga: {props.stats.rankName}</p>
        <p>Zdobytych medali: {props.stats.badgesNumber}</p>
        <p>Wykonanych aktywności: {props.stats.completedActivities}</p>
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
