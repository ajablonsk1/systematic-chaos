import { Card, Col, Row } from 'react-bootstrap'
import { GameButton } from './GameButton'
import { GameCardContent, GameCardOptionPick, GameCardRankRow } from './GameCardStyles'
import { GameCardShortTable } from './GameCardShortTable'
import badgeExample from '../../../storage/resources/badges/new.png'
import { GameCardBadgeList } from './GameCardBadgeList'
import rankExample from '../../../storage/resources/ranks/master.png'
import { GameCardRankImg } from './GameCardRankImg'
import { generateFullPath, PageRoutes } from '../../../routes/PageRoutes'

// todo: wtf, remove it or move to another file
// todo: endpoint needed
const badgeList = {
  badges: [
    {
      photo: badgeExample,
      name: 'Nowa Odznaka',
      desc: 'Za przejście każdej aktywności'
    },
    {
      photo: badgeExample,
      name: 'Nowsza Odznaka',
      desc: 'Za zdobycie 100% punktów w zadaniu Dżungla kabli'
    },
    {
      photo: badgeExample,
      name: 'Najnowsza Odznaka',
      desc: 'Za zdobycie w sumie ponad 1000 punktów'
    }
  ]
}

const recentActivities = {
  activities: [
    {
      name: 'Dżungla kabli',
      type: 'Ekspedycja',
      points: 200
    },
    {
      name: 'Mapowanie sieci',
      type: 'Zadanie bojowe',
      points: 300
    },
    {
      name: 'Feedback z rozdziału 1',
      type: 'Sondaż',
      points: 200
    }
  ]
}

export default function GameCard() {
  return (
    <GameCardContent className='py-2 mb-md-0 mb-5'>
      <Row className='w-100'>
        <Col xl={5} className='mb-2'>
          <GameCardOptionPick>
            <Card.Body style={{ textAlign: 'center' }}>
              <h2 style={{ fontWeight: 'bolder' }}>Miejsce w rankingu:</h2>
              <h2 style={{ fontSize: '6rem' }}>#2</h2>
              <h3
                style={{
                  position: 'relative',
                  textAlign: 'right',
                  marginTop: 0,
                  transform: 'translateY(-150%)',
                  zIndex: 10
                }}
              >
                /180
              </h3>
              <h2>Gratulacje!</h2>
              <h2>Jesteś w TOP 10%!</h2> {/*//TODO: calculate it! */}
            </Card.Body>
            <GameButton
              text='Sprawdź cały ranking'
              route={generateFullPath(() => PageRoutes.Student.Ranking.RANKING)}
            />
          </GameCardOptionPick>
        </Col>
        <Col xl={7} className='mb-2'>
          <GameCardOptionPick>
            <Card.Body style={{ textAlign: 'center' }}>
              <h2 style={{ fontWeight: 'bolder' }}>Ostatnie odznaki:</h2>
              <GameCardBadgeList badges={badgeList.badges} />
            </Card.Body>
            <GameButton
              text='Sprawdź wszystkie zdobyte odznaki'
              route={generateFullPath(() => PageRoutes.Student.BadgesAndAchievements.BADGES_ACHIEVEMENTS)}
            />
          </GameCardOptionPick>
        </Col>

        <Col xl={5} className='mb-2'>
          <GameCardOptionPick>
            <Card.Body style={{ textAlign: 'center' }}>
              <h2 style={{ fontWeight: 'bolder' }}>Twoja ranga:</h2>
              <GameCardRankRow>
                <GameCardRankImg src={rankExample} alt='Rank indicator' />
                <h2 style={{ marginTop: 'auto', marginBottom: 'auto' }}>Mistrz</h2>
              </GameCardRankRow>
              <h5>
                Punkty: <b>529</b>
              </h5>
              <h5>471 pkt do kolejnej rangi</h5>
            </Card.Body>
            <GameButton text='Sprawdź swoje punkty' route={generateFullPath(() => PageRoutes.Student.Points.POINTS)} />
          </GameCardOptionPick>
        </Col>
        <Col xl={7} className='mb-md-2 mb-5'>
          <GameCardOptionPick>
            <Card.Body
              style={{
                textAlign: 'center'
              }}
            >
              <div>
                <h2 style={{ fontWeight: 'bolder' }}>Ostatnio zdobyte punkty:</h2>
                <GameCardShortTable recentActivities={recentActivities} />
              </div>
            </Card.Body>
            <GameButton text='Zobacz pełną listę' route={generateFullPath(() => PageRoutes.Student.Points.POINTS)} />
          </GameCardOptionPick>
        </Col>
      </Row>
    </GameCardContent>
  )
}
