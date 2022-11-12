import React, { useCallback, useRef, useState, useTransition } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { HeroType } from '../../../../utils/userRole'
import { coolDownDescription, ERROR_OCCURRED, getHeroName, getSpecifyDescription } from '../../../../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Tooltip from '../../../general/Tooltip/Tooltip'
import ProfessorService from '../../../../services/professor.service'
import { successToast } from '../../../../utils/toasts'

function SuperPowerEditionModal(props) {
  const heroTypes = Object.values(HeroType)

  const [selectedHeroType, setSelectedHeroType] = useState(heroTypes[0])
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [isEditionFetching, startEditionProcess] = useTransition()

  const baseValueRef = useRef()
  const coolDownRef = useRef()

  const editSuperPower = () => {
    startEditionProcess(() => {
      const baseValue = +baseValueRef.current?.value
      let coolDownValue = +coolDownRef.current?.value

      if (!baseValue) {
        setErrorMessage('Wartość bazowa musi być liczbą.')
      } else if (!coolDownValue && (selectedHeroType === HeroType.WARRIOR || selectedHeroType === HeroType.WIZARD)) {
        setErrorMessage('Wartość czasu ładowania musi być liczbą.')
      } else {
        setErrorMessage(undefined)

        if (selectedHeroType === HeroType.PRIEST) {
          coolDownValue = coolDownValue * 60 * 1000 // min -> ms
        }

        ProfessorService.editHeroSuperPower(selectedHeroType, baseValue, coolDownValue)
          .then(() => {
            props.setModalVisible(false)
            successToast('Umiejętność bohatera została zmieniona poprawnie.')
          })
          .catch((error) => {
            setErrorMessage(error.response?.data?.message ?? ERROR_OCCURRED)
          })
      }
    })
  }

  const infoIcon = useCallback(
    (dataFor) => {
      const dataTip =
        dataFor === 'coolDownInfo' ? coolDownDescription(selectedHeroType) : getSpecifyDescription(selectedHeroType)

      return (
        <>
          <FontAwesomeIcon className={'ms-2'} icon={faCircleInfo} data-for={dataFor} data-tip={dataTip} />
          <Tooltip id={dataFor} />
        </>
      )
    },
    [selectedHeroType]
  )

  return (
    <Modal show={props.isModalVisible} onHide={() => props.setModalVisible(false)} size={'lg'}>
      <ModalHeader>
        <h5>Edycja umiejętności postaci.</h5>
      </ModalHeader>
      <ModalBody>
        <div>
          <FormLabel className={'fw-bold'}>Rodzaj postaci</FormLabel>
          <Form.Select onChange={(e) => setSelectedHeroType(e.target.value)}>
            {heroTypes.map((heroType, index) => (
              <option value={heroType} name={heroType} key={index}>
                {getHeroName(heroType)}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className={'mt-4'}>
          <FormLabel className={'fw-bold'}>
            <span>Wartość bazowa</span>
            {infoIcon('baseValueInfo')}
          </FormLabel>
          <FormControl type={'number'} ref={baseValueRef} />
        </div>

        {selectedHeroType === HeroType.WIZARD || selectedHeroType === HeroType.WARRIOR ? (
          <div className={'mt-4'}>
            <FormLabel className={'fw-bold'}>
              <span>Czas ładowania</span>
              {infoIcon('coolDownInfo')}
            </FormLabel>
            <FormControl type={'number'} ref={coolDownRef} />
          </div>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <div className={'gap-2 d-flex w-100 justify-content-center'}>
          <Button
            style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
            onClick={() => props.setModalVisible(false)}
          >
            Anuluj
          </Button>
          <Button
            style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
            onClick={editSuperPower}
            disabled={isEditionFetching}
          >
            {isEditionFetching ? <Spinner animation={'border'} /> : <span>Zapisz</span>}
          </Button>
        </div>

        {!!errorMessage ? <p className={'text-danger w-100 text-center'}>{errorMessage}</p> : null}
      </ModalFooter>
    </Modal>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(SuperPowerEditionModal)
