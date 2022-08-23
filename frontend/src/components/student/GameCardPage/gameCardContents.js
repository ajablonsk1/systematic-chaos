import { Col, Row } from 'react-bootstrap'
import PercentageCircle from '../PointsPage/ChartAndStats/PercentageCircle'
import React from 'react'
import { ChartCol, CustomTable } from './gameCardContentsStyle'
import { HeroImg } from '../../../utils/constants'
import { HeroType } from '../../../utils/userRole'
import { Bar, Pie } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { barConfig, pieConfig } from '../../../utils/chartConfig'

export const GradesStatsContent = () => {
  const points = 8000
  const maxPoints = 9780
  const percentageValue = Math.round(100 * (points / maxPoints))
  const exampleData = {
    avgExpedition: '78%',
    avgCombatTask: '57%',
    surveysCounter: 7,
    expeditionPoints: '5800',
    combatTaskPoints: '2183'
  }

  return (
    <Row className={'h-100 d-flex justify-content-center align-items-center'}>
      <Col md={7}>
        <p>Średni wynik z ekspedycji: {exampleData.avgExpedition}</p>
        <p>Średni wynik z zadań bojowych: {exampleData.avgCombatTask}</p>
        <p>Ilość wykonanych sondaży: {exampleData.surveysCounter}</p>
        <p>Punkty zdobyte w ekspedycjach: {exampleData.expeditionPoints}</p>
        <p>Punkty zdobyte w zadaniach bojowych: {exampleData.combatTaskPoints}</p>
      </Col>
      <Col md={5}>
        <PercentageCircle percentageValue={percentageValue} points={points} maxPoints={maxPoints} />
      </Col>
    </Row>
  )
}

export const LastActivitiesContent = () => {
  const activitiesData = [
    {
      chapterName: 'Rozdział 1',
      activityType: 'Ekspedycja',
      points: 25,
      availableUntil: '05.10.2022'
    },
    {
      chapterName: 'Rozdział 1',
      activityType: 'Zadanie bojowe',
      points: 15,
      availableUntil: '14.10.2022'
    },
    {
      chapterName: 'Rozdział 2',
      activityType: 'Sondaż',
      points: 2,
      availableUntil: '22.10.2022'
    },
    {
      chapterName: 'Rozdział 1',
      activityType: 'Ekspedycja',
      points: 52,
      availableUntil: '02.11.2022'
    },
    {
      chapterName: 'Rozdział 3',
      activityType: 'Wywiad',
      points: 0,
      availableUntil: '05.11.2022'
    }
  ]

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
        {activitiesData.map((activity, index) => (
          <tr key={index + Date.now()}>
            <td>{activity.chapterName}</td>
            <td>{activity.activityType}</td>
            <td>{activity.points}</td>
            <td>{activity.availableUntil}</td>
          </tr>
        ))}
      </tbody>
    </CustomTable>
  )
}

export const HeroStatsContent = () => {
  const stats = {
    experiencePoints: 500,
    nextLvlPoints: 750,
    lvl: 'Uczeń Mistrza',
    badgesNumber: 5,
    completedActivities: '35%'
  }

  return (
    <Row className={'h-100 d-flex justify-content-center align-items-center'}>
      <Col md={6} className={'h-100'}>
        <img style={{ maxWidth: '100%' }} height={'90%'} src={HeroImg.WARRIOR} alt={'Your hero'} />
      </Col>
      <Col md={6}>
        <p>Punkty doświadczenia: {stats.experiencePoints}</p>
        <p>Punkty do kolejnej rangi: {stats.nextLvlPoints}</p>
        <p>Ranga: {stats.lvl}</p>
        <p>Zdobytych medali: {stats.badgesNumber}</p>
        <p>Wykonanych aktywności: {stats.completedActivities}</p>
      </Col>
    </Row>
  )
}

export const PersonalRankingInfoContent = () => {
  const heroType = HeroType.WIZARD
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
