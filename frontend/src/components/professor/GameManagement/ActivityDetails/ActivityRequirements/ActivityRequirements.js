import React, { useCallback, useEffect, useState } from 'react'
import { Row, Button, Spinner } from 'react-bootstrap'
import { ERROR_OCCURRED, RequirementType } from '../../../../../utils/constants'
import { CustomTable } from '../../../../student/GameCardPage/gameCardContentsStyle'
import { CheckBox, Input, Select, Switch } from './activityRequirementsForms'
import DatePicker, { registerLocale } from 'react-datepicker'
import { onInputChange, onMultiSelectChange } from './formHelpers'
import 'react-datepicker/dist/react-datepicker.css'
import pl from 'date-fns/locale/pl'
import CreatableInput from '../../../../general/CreatableInput/CreatableInput'
import ActivityService from '../../../../../services/activity.service'

registerLocale('pl', pl)

function ActivityRequirements(props) {
  const [requirementsList, setRequirementsList] = useState(undefined)
  const [multiSelectLists, setMultiSelectLists] = useState([])
  const [onSaveError, setOnSaveError] = useState('')

  useEffect(() => {
    ActivityService.getActivityRequirements(props.activityId)
      .then((response) => {
        setRequirementsList(response.map((requirement) => ({ ...requirement, answer: null })))
      })
      .catch(() => {
        setRequirementsList(null)
      })
  }, [props.activityId])

  useEffect(() => {
    onMultiSelectChange(setRequirementsList, multiSelectLists)
  }, [multiSelectLists])

  const saveRequirements = () => {
    const getAnswer = (requirement) => {
      switch (requirement.type.toLowerCase()) {
        case RequirementType.MULTI_SELECT:
          const requirementAnswers = multiSelectLists.find((element) => element.id === requirement.id)?.list
          return requirementAnswers ? requirementAnswers.join(';') : requirement.value.join(';')

        case RequirementType.DATE:
          const date = requirement.answer?.getTime() ?? requirement.value
          return date.toString()

        case RequirementType.TEXT:
        case RequirementType.NUMBER:
        case RequirementType.BOOLEAN:
          const answer = requirement.answer ?? requirement.value ?? ''
          return answer.toString()

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

    ActivityService.setActivityRequirements(props.activityId, requirementsToSend).catch((error) => {
      setOnSaveError(error.response.data.message)
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
        return (
          <DatePicker
            selected={new Date(requirement.answer ?? requirement.value)}
            onChange={(date) => onInputChange(requirement.id, date, setRequirementsList)}
            showTimeSelect
            timeFormat={'p'}
            dateFormat={'Pp'}
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
      <Row className={'m-0 px-3 d-flex flex-column align-items-center'} style={{ height: '85vh', overflowY: 'auto' }}>
        <Row>
          <CustomTable>
            <tbody>
              <tr className={'position-sticky top-0'} style={{ zIndex: 100 }}>
                <th className={'text-center'} colSpan={3}>
                  Lista wymagań, które student musi spełnić, żeby odblokować możliwość wykonania tej aktywności:
                </th>
              </tr>
              {requirementsList === undefined ? (
                <tr>
                  <td colSpan={3}>
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
        </Row>
      </Row>
      {onSaveError && <p className={'w-100 text-center text-danger'}>{onSaveError}</p>}
      <Button className={'position-relative start-50 translate-middle-x w-auto mt-3'} onClick={saveRequirements}>
        Zapisz zmiany
      </Button>
    </>
  )
}

export default ActivityRequirements
