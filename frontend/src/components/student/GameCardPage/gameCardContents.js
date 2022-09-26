import { Col, Row } from 'react-bootstrap'
import PercentageCircle from '../PointsPage/ChartAndStats/PercentageCircle'
import React from 'react'
import { ChartCol, CustomTable } from './gameCardContentsStyle'
import { getActivityTypeName, HeroImg } from '../../../utils/constants'
import { HeroType } from '../../../utils/userRole'
import { Bar, Pie } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { barConfig, pieConfig } from '../../../utils/chartConfig'
import moment from 'moment'

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

export const PersonalRankingInfoContent = () => {
  const heroType = HeroType.WARRIOR
  // I know it's stupid now, but I want to show you what it will look like later
  const rankComment =
    heroType === HeroType.WARRIOR || heroType === HeroType.ROGUE ? (
      <span>
        Gratulacje, zajmujesz <strong>2</strong> miejsce na <strong>125</strong>! Jesteś prawdziwym mistrzem :)
      </span>
    ) : (
      <span>
        Niesamowite! Jesteś w grupie <strong>5</strong>% najlepszych graczy :O
      </span>
    )

  const chartType = heroType === HeroType.WARRIOR || heroType === HeroType.ROGUE ? 'BAR' : 'PIE'

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

  const { data, options } =
    chartType === 'BAR'
      ? barConfig(
          ['Punkty najlepszego gracza', 'Twój wynik'],
          [2310, 1950],
          ['rgba(255, 179, 13, 1)', 'rgba(8, 84, 84, 1)']
        )
      : pieConfig(
          ['Grupa graczy, w której jesteś', 'Pozostali gracze'],
          [5, 95],
          ['rgba(255, 179, 13, 1)', 'rgba(8, 84, 84, 1)']
        )

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
