import React, { useCallback, useEffect, useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import { getRequirements } from '../../../../student/GameMapPage/Map/mockData'
import { RequirementType } from '../../../../../utils/constants'
import { CustomTable } from '../../../../student/GameCardPage/gameCardContentsStyle'
import { CheckBox, Input, Select, Switch } from './activityRequirementsForms'
import DatePicker, { registerLocale } from 'react-datepicker'
import { onInputChange, onMultiSelectChange } from './formHelpers'
import 'react-datepicker/dist/react-datepicker.css'
import pl from 'date-fns/locale/pl'
import CreatableInput from '../../../../general/CreatableInput/CreatableInput'

registerLocale('pl', pl)

function ActivityRequirements(props) {
  const requirements = getRequirements() // all possible requirements from backend
  const [requirementsList, setRequirementsList] = useState(
    requirements.map((requirement) => ({ ...requirement, answer: null }))
  )
  const [multiSelectLists, setMultiSelectLists] = useState([])

  useEffect(() => {
    onMultiSelectChange(setRequirementsList, multiSelectLists)
  }, [multiSelectLists])

  const inputContent = useCallback((requirement) => {
    switch (requirement.type) {
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
              {requirementsList.map((requirement, index) => (
                <tr key={'req' + index}>
                  <td>
                    <CheckBox requirement={requirement} onChangeCallback={setRequirementsList} />
                  </td>
                  <td className={'w-50'}>{requirement.name}</td>
                  <td style={{ width: '45%', maxWidth: '45%', wordBreak: 'break-word' }}>
                    {inputContent(requirement)}
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </Row>
      </Row>
      <Button className={'position-relative start-50 translate-middle-x w-auto mt-3'}>Zapisz zmiany</Button>
    </>
  )
}

export default ActivityRequirements
