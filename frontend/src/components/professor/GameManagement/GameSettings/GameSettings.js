import React from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { Button, Col, Form, Row } from 'react-bootstrap'
import gameMap from '../../../student/GameMapPage/resources/map1.png'
import ColorPicker from './ColorPicker'
import { useNavigate } from 'react-router-dom'
import { TeacherRoutes } from '../../../../routes/PageRoutes'
import { connect } from 'react-redux'

function GameSettings(props) {
  const navigate = useNavigate()

  const colorPickerElements = [
    { header: 'Kolor wiodący', colors: ['#001542', 'white', 'black'] },
    { header: 'Kolor drugoplanowy', colors: ['#223762'] },
    { header: 'Kolor tekstu', colors: ['#ffb30d'] },
    { header: 'Kolor akcentów', colors: ['#085454'] },
    { header: 'Kolor przycisku anulowania/przerwania operacji', colors: ['red'] },
    { header: 'Kolor przycisku akceptacji', colors: ['green'] }
  ]

  return (
    <Content>
      <Row className={'m-0 vh-100'}>
        <Col md={6}>
          <h3 className={'pt-4'}>Motywy kolorystyczne</h3>
          <p>Użyte motywy kolorystyczne wpłyną na wygląd aplikacji i wszystkich użytkowników.</p>
          <Form.Check className={'mb-3'} label={'Wykorzystaj domyślną kolorystykę'} />
          <div>
            {colorPickerElements.map((pickerSet, index) => (
              <ColorPicker key={index} header={pickerSet.header} colors={pickerSet.colors} selectedColorId={0} />
            ))}
          </div>
        </Col>
        <Col md={6}>
          <Row style={{ height: '95%', alignContent: 'flex-start' }} className={'d-flex'}>
            <h3 className={'pt-4'}>Rozgrywka</h3>
            <p>Zmień wygląd mapy gry.</p>
            <div>
              <h5>Wykorzystywana mapa</h5>
              <img src={gameMap} alt={'actual-game-map'} width={'100%'} />
            </div>
            <div className={'pt-3'} style={{ cursor: 'pointer' }}>
              <h5>Zaimportuj nową mapę</h5>
              <input type={'file'} accept={'image/png, image/jpeg'} />
            </div>
          </Row>
          <div className={'gap-2 d-flex justify-content-end'}>
            <Button variant={'secondary'} onClick={() => navigate(TeacherRoutes.GAME_MANAGEMENT.MAIN)}>
              Wstecz
            </Button>
            <Button style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}>
              Zapisz zmiany
            </Button>
          </div>
        </Col>
      </Row>
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(GameSettings)
