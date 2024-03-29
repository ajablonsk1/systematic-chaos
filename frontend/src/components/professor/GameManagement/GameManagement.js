import { useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Col, Container, OverlayTrigger, Row, Spinner, Table } from 'react-bootstrap'
import { GameCardOptionPick } from '../../general/GameCardStyles'
import GameButton from './GameButton'
import ManagementCard from './ManagementCard'
import { useNavigate } from 'react-router-dom'
import { TableBodyRow } from './TableStyles'
import GameLoaderModal from './GameLoader/GameLoaderModal'
import ChapterService from '../../../services/chapter.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import ChapterModal from './ChapterModal/ChapterModal'
import { TeacherRoutes } from '../../../routes/PageRoutes'
import { connect } from 'react-redux'
import { isMobileView } from '../../../utils/mobileHelper'
import { CustomTooltip } from '../ChapterDetails/ChapterDetailsStyles'
import SuperPowerEditionModal from './GameSettings/SuperPowerEditionModal'

const chapterBlockedInfo =
  'Ten rozdział został ukryty dla studentów i nie mogą go zobaczyć. Aby przywrócić widoczność, przejdź do ustawień wymagań dla rozdziału.'
function GameManagement(props) {
  const navigate = useNavigate()

  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showAddChapterModal, setShowAddChapterModal] = useState(false)
  const [chapterList, setChapterList] = useState(undefined)
  const [shouldLoadAddChapterModal, setShouldLoadAddChapterModal] = useState(false)
  const [isSuperpowerModalVisible, setIsSuperpowerModalVisible] = useState(false)

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
    navigate(TeacherRoutes.GAME_MANAGEMENT.CHAPTER.MAIN + `/${chapterName}/${chapterId}`)
  }

  const downloadBackupFile = () => {
    // TODO: use endpoint and download.js
  }

  return (
    <Content>
      <h4 className='text-center pt-3'>Witaj w panelu zarządzania grą!</h4>
      <p className='text-center'>
        Tutaj możesz dostosować wygląd, fabułę i sposób działania rozgrywki zgodnie ze swoimi potrzebami.
      </p>
      <Container style={{ marginBottom: isMobileView() ? 85 : 0 }}>
        <Row style={{ height: '50vh' }}>
          <Col style={{ maxHeight: '50vh' }}>
            <GameCardOptionPick
              className={'d-flex flex-column justify-content-between'}
              $background={props.theme.secondary}
              $fontColor={props.theme.font}
            >
              <div>
                <h5 className='text-center pt-2'>Rozdziały</h5>
                <p className='text-center'>Edytuj istniejące rozdziały lub dodaj nowy.</p>
                <div style={{ overflow: 'auto', maxHeight: '35vh' }}>
                  <Table style={{ color: props.theme.font, maxHeight: '100px' }}>
                    <thead style={{ border: `1px solid ${props.theme.primary}`, backgroundColor: props.theme.primary }}>
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
                          <OverlayTrigger
                            key={index}
                            placement='top'
                            overlay={
                              chapter.isBlocked ? (
                                <CustomTooltip style={{ position: 'fixed' }}>{chapterBlockedInfo}</CustomTooltip>
                              ) : (
                                <></>
                              )
                            }
                          >
                            <TableBodyRow
                              $background={props.theme.primary}
                              onClick={() => goToChapterDetailsView(chapter.name, chapter.id)}
                              style={{ opacity: chapter.isBlocked ? 0.4 : 1 }}
                            >
                              <td>{chapter.name}</td>
                              <td className='text-center'>{chapter.noActivities}</td>
                              <td className='text-center'>{chapter.maxPoints}</td>
                              <td className='text-center'>{chapter.mapSize}</td>
                            </TableBodyRow>
                          </OverlayTrigger>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>

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
            {/*<ManagementCard*/}
            {/*  header={'Ustawienia gry'}*/}
            {/*  description={'Dopasuj temat fabuły i wygląd całej gry oraz całego systemu.'}*/}
            {/*  routePath={TeacherRoutes.GAME_MANAGEMENT.GAME_SETTINGS}*/}
            {/*/>*/}
            <ManagementCard
              header={'Umiejętności postaci'}
              description={'Zmiana ustawienia umiejętności postaci .'}
              callback={() => setIsSuperpowerModalVisible(true)}
            />
          </Col>
          <Col md={4} className={'py-2'}>
            <ManagementCard
              header={'Wczytaj konfigurację gry'}
              description={'Wyczyść cały stan bazy danych i wczytaj stan od nowa podając plik zawierający backup.'}
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
              routePath={TeacherRoutes.GAME_MANAGEMENT.LOGS}
            />
          </Col>
        </Row>
      </Container>
      <GameLoaderModal showModal={showConfigModal} setShowModal={setShowConfigModal} />
      <ChapterModal
        showModal={showAddChapterModal}
        setShowModal={setShowAddChapterModal}
        onSuccess={fetchChaptersList}
        isLoaded={shouldLoadAddChapterModal}
      />
      <SuperPowerEditionModal isModalVisible={isSuperpowerModalVisible} setModalVisible={setIsSuperpowerModalVisible} />
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(GameManagement)
