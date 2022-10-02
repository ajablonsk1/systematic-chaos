import { Content } from '../../App/AppGeneralStyles'
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap'
import { GameCardOptionPick } from '../../general/GameCardStyles'
import { GameButton } from './GameButton'
import ManagementCard from './ManagementCard'
import { useNavigate } from 'react-router-dom'
import { TableBodyRow } from './TableStyles'
import GameLoaderModal from './GameLoader/GameLoaderModal'
import { useEffect, useState } from 'react'
import ChapterService from '../../../services/chapter.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { AddOrEditChapterModal } from './AddChapterModal/AddChapterModal'
import { TeacherRoutes } from '../../../routes/PageRoutes'

export default function GameManagement() {
  const navigate = useNavigate()

  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showAddChapterModal, setShowAddChapterModal] = useState(false)
  const [chapterList, setChapterList] = useState(undefined)
  const [shouldLoadAddChapterModal, setShouldLoadAddChapterModal] = useState(false)

  useEffect(() => {
    fetchChaptersList()
  }, [])

  const fetchChaptersList = () => {
    ChapterService.getChaptersList()
      .then((response) => {
        setChapterList(response)
      })
      .catch(() => {
        setChapterList(null)
      })
  }

  const goToChapterDetailsView = (chapterName, chapterId) => {
    navigate(TeacherRoutes.GAME_MANAGEMENT.CHAPTER + `/${chapterName}/${chapterId}`)
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
                  {chapterList === undefined ? (
                    <tr>
                      <td colSpan='100%' className={'text-center'}>
                        <Spinner animation={'border'} />
                      </td>
                    </tr>
                  ) : chapterList == null || chapterList.length === 0 ? (
                    <tr>
                      <td colSpan='100%' className={'text-center'}>
                        <p>{chapterList == null ? ERROR_OCCURRED : 'Lista rozdziałów jest pusta'}</p>
                      </td>
                    </tr>
                  ) : (
                    chapterList.map((chapter, index) => (
                      <TableBodyRow key={index} onClick={() => goToChapterDetailsView(chapter.name, chapter.id)}>
                        <td>{chapter.name}</td>
                        <td className='text-center'>{chapter.noActivities}</td>
                        <td className='text-center'>{chapter.maxPoints}</td>
                        <td className='text-center'>{chapter.mapSize}</td>
                      </TableBodyRow>
                    ))
                  )}
                </tbody>
              </Table>
              <GameButton
                text={'Nowy rozdział'}
                customWidth={'auto'}
                callback={() => {
                  setShowAddChapterModal(true)
                  setShouldLoadAddChapterModal(true)
                }}
              />
            </GameCardOptionPick>
          </Col>
        </Row>
        <Row className={'py-2 text-center'}>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Grupy'}
              description={'Sprawdź listę grup zajęciowych i ich kody dostępu.'}
              routePath={TeacherRoutes.GAME_MANAGEMENT.GROUPS}
            />
          </Col>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Rangi i odznaki'}
              description={'Personalizuj nazwy odznak i sposób ich przyznawania.'}
              routePath={TeacherRoutes.GAME_MANAGEMENT.RANKS_AND_BADGES}
            />
          </Col>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Temat gry'}
              description={'Dopasuj temat fabuły i wygląd całej gry oraz całego systemu.'}
              routePath={TeacherRoutes.GAME_MANAGEMENT.GAME_SETTINGS}
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
      <GameLoaderModal showModal={showConfigModal} setShowModal={setShowConfigModal} />
      <AddOrEditChapterModal
        showModal={showAddChapterModal}
        setShowModal={setShowAddChapterModal}
        refetchChapterList={fetchChaptersList}
        isLoaded={shouldLoadAddChapterModal}
      />
    </Content>
  )
}
