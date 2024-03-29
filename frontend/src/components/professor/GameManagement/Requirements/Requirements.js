import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { Row, Button, Spinner, Form } from 'react-bootstrap'
import { ERROR_OCCURRED, RequirementType } from '../../../../utils/constants'
import { CustomTable } from '../../../student/GameCardPage/gameCardContentsStyle'
import { CheckBox, Input, Select, Switch } from './requirementsForms'
import DatePicker, { registerLocale } from 'react-datepicker'
import { onInputChange, onMultiSelectChange } from './formHelpers'
import 'react-datepicker/dist/react-datepicker.css'
import pl from 'date-fns/locale/pl'
import CreatableInput from '../../../general/CreatableInput/CreatableInput'
import { successToast } from '../../../../utils/toasts'
import { connect } from 'react-redux'
import { isMobileView } from '../../../../utils/mobileHelper'
import GoBackButton from '../../../general/GoBackButton/GoBackButton'
import { TeacherRoutes } from '../../../../routes/PageRoutes'

registerLocale('pl', pl)

function Requirements(props) {
  const { chapterName, chapterId } = props.chapterDetails

  const [requirementsList, setRequirementsList] = useState(undefined)
  const [multiSelectLists, setMultiSelectLists] = useState([])
  const [onSaveError, setOnSaveError] = useState('')
  const [isSaving, startSaving] = useTransition()
  const [isElementBlocked, setIsElementBlocked] = useState(false)

  const blockadeRef = useRef()

  useEffect(() => {
    props
      .getRequirementsCallback(props.id)
      .then((response) => {
        setRequirementsList(response.requirements.map((requirement) => ({ ...requirement, answer: null })))
        setIsElementBlocked(response.isBlocked)
      })
      .catch(() => {
        setRequirementsList(null)
      })
    // eslint-disable-next-line
  }, [props.id])

  useEffect(() => {
    onMultiSelectChange(setRequirementsList, multiSelectLists)
  }, [multiSelectLists])

  const saveRequirements = () => {
    startSaving(() => {
      const getAnswer = (requirement) => {
        switch (requirement.type.toLowerCase()) {
          case RequirementType.MULTI_SELECT:
            const requirementAnswers = multiSelectLists.find((element) => element.id === requirement.id)?.list
            return requirementAnswers ? requirementAnswers.join(';') : requirement.value.join(';')

          case RequirementType.DATE:
            const date = requirement.answer?.getTime() ?? requirement.value ?? Date.now()
            return date.toString()

          case RequirementType.TEXT:
            const textAnswer = requirement.answer ?? requirement.value ?? ''
            return textAnswer.toString()

          case RequirementType.NUMBER:
            const numberAnswer = requirement.answer ?? requirement.value ?? 0
            return numberAnswer.toString()

          case RequirementType.BOOLEAN:
            const booleanAnswer = requirement.answer ?? requirement.value ?? 'false'
            return booleanAnswer.toString()

          case RequirementType.SELECT:
            return requirement.answer ?? requirement.value[0] ?? ''

          default:
            return ''
        }
      }

      const requirementsToSend = requirementsList.map((r) => {
        return {
          id: r.id,
          selected: r.selected,
          value: getAnswer(r)
        }
      })
      props
        .updateRequirementsCallback(props.id, requirementsToSend, blockadeRef?.current?.checked ?? false)
        .then(() => {
          successToast()
        })
        .catch((error) => {
          setOnSaveError(error.response.data.message)
        })
    })
  }

  const inputContent = useCallback((requirement) => {
    switch (requirement.type.toLowerCase()) {
      case RequirementType.TEXT:
      case RequirementType.NUMBER:
        return <Input requirement={requirement} onChangeCallback={setRequirementsList} />
      case RequirementType.SELECT:
        return <Select requirement={requirement} onChangeCallback={setRequirementsList} />
      case RequirementType.DATE:
        const date = new Date(requirement.answer ?? requirement.value ?? Date.now())

        return (
          <DatePicker
            selected={date instanceof Date && !isNaN(date.getTime()) ? date : new Date()}
            onChange={(date) => onInputChange(requirement.id, date, setRequirementsList)}
            showTimeSelect
            timeFormat={'p'}
            dateFormat={'dd.MM.yyyy, HH:mm'}
            locale={'pl'}
          />
        )
      case RequirementType.MULTI_SELECT:
        return (
          <CreatableInput
            defaultValues={requirement.value}
            onChangeCallback={(labels) => {
              setMultiSelectLists((prevState) => {
                if (prevState.find((list) => list.id === requirement.id)) {
                  return prevState.map((list) =>
                    list.id === requirement.id ? { id: requirement.id, list: labels } : list
                  )
                }
                return [...prevState, { id: requirement.id, list: labels }]
              })
            }}
          />
        )
      case RequirementType.BOOLEAN:
        return <Switch requirement={requirement} onChangeCallback={setRequirementsList} />
      default:
        return <></>
    }
  }, [])

  return (
    <>
      <Row
        className={'m-0 d-flex flex-column align-items-center'}
        style={{ height: '85vh', overflowY: 'auto', padding: isMobileView() ? 0 : '0 1rem' }}
      >
        <Row>
          <CustomTable
            $fontColor={props.theme.font}
            $borderColor={props.theme.primary}
            $background={props.theme.secondary}
          >
            <tbody>
              <tr className={'position-sticky top-0'} style={{ zIndex: 100 }}>
                <th className={'text-center'} colSpan={3}>
                  {props.tableTitle}
                </th>
              </tr>
              {requirementsList === undefined ? (
                <tr>
                  <td colSpan={3} className={'text-center'}>
                    <Spinner animation={'border'} />
                  </td>
                </tr>
              ) : requirementsList == null ? (
                <tr>
                  <td colSpan={3}>{ERROR_OCCURRED}</td>
                </tr>
              ) : (
                requirementsList.map((requirement, index) => (
                  <tr key={'req' + index}>
                    <td>
                      <CheckBox requirement={requirement} onChangeCallback={setRequirementsList} />
                    </td>
                    <td className={'w-50'}>{requirement.name}</td>
                    <td style={{ width: '45%', maxWidth: '45%', wordBreak: 'break-word' }}>
                      {inputContent(requirement)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </CustomTable>
          <Form.Check
            ref={blockadeRef}
            className={'pt-3'}
            checked={isElementBlocked}
            onChange={(e) => setIsElementBlocked(e.target.checked)}
            label={'Zablokuj dostęp studentom'}
          ></Form.Check>
        </Row>
      </Row>
      {onSaveError && (
        <p className={'w-100 text-center'} style={{ color: props.theme.danger }}>
          {onSaveError}
        </p>
      )}

      <div className={'d-flex justify-content-center gap-2'}>
        <GoBackButton
          goTo={TeacherRoutes.GAME_MANAGEMENT.CHAPTER.MAIN + `/${chapterName}/${chapterId}`}
          customClass={'mt-3'}
        />

        <Button className={'w-auto mt-3'} onClick={saveRequirements}>
          {isSaving ? <Spinner animation={'border'} size={'sm'} /> : <span>Zapisz zmiany</span>}
        </Button>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(Requirements)
