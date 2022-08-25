import { Content } from '../../App/AppGeneralStyles'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { getChaptersList } from './mockData'
import { GameCardOptionPick } from '../../general/GameCardStyles'
import { GameButton } from './GameButton'
import { generateFullPath, PageRoutes } from '../../../routes/PageRoutes'
import ManagementCard from './ManagementCard'
import { useNavigate } from 'react-router-dom'
import { TableBodyRow } from './TableStyles'
import GameLoader from './GameLoader/GameLoader'
import { useState } from 'react'

export default function GameManagement() {
  const [showConfigModal, setShowConfigModal] = useState(false)

  // TODO: use endpoint later
  const chaptersList = getChaptersList()

  const navigate = useNavigate()

  const goToChapterDetailsView = (chapterName, chapterId) => {
    navigate(
      generateFullPath(() => PageRoutes.Teacher.GameManagement.Chapters.CHAPTER) + `/${chapterName}/${chapterId}`
    )
  }

  const downloadBackupFile = () => {
    // TODO: use endpoint and download.js
  }

  const downloadLogsFile = () => {
    // TODO: use endpoint and download.js
  }

  return (
    <Content>
      <h4 className='text-center pt-3'>Witaj w panelu zarządzania grą!</h4>
      <p className='text-center'>
        Tutaj możesz dostosować wygląd, fabułę i sposób działania rozgrywki zgodnie ze swoimi potrzebami.
      </p>
      <Container>
        <Row>
          <Col>
            <GameCardOptionPick>
              <h5 className='text-center pt-2'>Rozdziały</h5>
              <p className='text-center'>Edytuj istniejące rozdziały lub dodaj nowy.</p>
              <Table style={{ color: 'var(--font-color)' }}>
                <thead>
                  <tr>
                    <th>Nazwa rozdziału</th>
                    <th className='text-center'>Liczba aktywności</th>
                    <th className='text-center'>Punkty</th>
                    <th className='text-center'>Wymiary mapy</th>
                  </tr>
                </thead>
                <tbody>
                  {chaptersList.map((chapter, index) => (
                    <TableBodyRow key={index} onClick={() => goToChapterDetailsView(chapter.name, chapter.id)}>
                      <td>{chapter.name}</td>
                      <td className='text-center'>{chapter.noActivities}</td>
                      <td className='text-center'>{chapter.points}</td>
                      <td className='text-center'>{chapter.mapSize}</td>
                    </TableBodyRow>
                  ))}
                </tbody>
              </Table>
              <GameButton text={'Nowy rozdział'} customWidth={'auto'} />
            </GameCardOptionPick>
          </Col>
        </Row>
        <Row className={'py-2 text-center'}>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Grupy'}
              description={'Sprawdź listę grup zajęciowych i ich kody dostępu.'}
              routePath={generateFullPath(() => PageRoutes.Teacher.GameManagement.Groups.GROUPS)}
            />
          </Col>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Rangi i odznaki'}
              description={'Personalizuj nazwy odznak i sposób ich przyznawania.'}
              routePath={generateFullPath(
                () => PageRoutes.Teacher.GameManagement.RanksAndBadgesManagement.RANKS_BADGES
              )}
            />
          </Col>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Temat gry'}
              description={'Dopasuj temat fabuły i wygląd całej gry oraz całego systemu.'}
            />
          </Col>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Wczytaj konfigurację gry'}
              description={'Wyczyść cały stan bazy danych i wczytaj stan od nowa.'}
              callback={() => setShowConfigModal(true)}
            />
          </Col>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Kopia zapasowa'}
              description={'Pobierz kopię zapasową bazy danych, żeby móc wczytać konfigurację z tego pliku.'}
              callback={downloadBackupFile}
            />
          </Col>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Lista logów serwera'}
              description={'Pobierz listę logów z serwera zbieranych od początku istnienia aplikacji.'}
              callback={downloadLogsFile}
            />
          </Col>
        </Row>
      </Container>
      <GameLoader showModal={showConfigModal} setShowModal={setShowConfigModal} />
    </Content>
  )
}
