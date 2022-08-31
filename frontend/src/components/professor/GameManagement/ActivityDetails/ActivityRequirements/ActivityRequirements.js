import React, { useEffect, useState } from 'react'
import { Row, Button, Form } from 'react-bootstrap'
import { getRequirements } from '../../../../student/GameMapPage/Map/mockData'
import { RequirementType } from '../../../../../utils/constants'
import { CustomTable } from '../../../../student/GameCardPage/gameCardContentsStyle'
import { CheckBox, TextInput } from './activityRequirementsForms'

function ActivityRequirements(props) {
  const requirements = getRequirements() // all possible requirements from backend
  const [requirementsList, setRequirementsList] = useState(requirements)

  useEffect(() => {
    console.log(requirementsList)
  }, [requirementsList])

  /*
   * When we use onChange in form element, it is bugged.
   * Example here: https://codesandbox.io/s/magical-star-l564r?file=/src/App.js
   * This is why we have to use form elements in main return component code.
   * **/

  return (
    <>
      <Row
        className={'m-0 px-3 d-flex flex-column justify-content-center align-items-center'}
        style={{ height: '90vh' }}
      >
        <h5 className={'text-center'}>
          Lista wymagań, które student musi spełnić, żeby odblokować możliwość wykonania tej aktywności:
        </h5>
        <Form>
          <CustomTable>
            <tbody>
              {requirementsList.map((requirement, index) => (
                <tr key={index + Date.now()}>
                  <td>
                    <CheckBox requirement={requirement} onChangeCallback={setRequirementsList} />
                  </td>
                  <td>{requirement.name}</td>
                  <td>
                    {requirement.type === RequirementType.TEXT ? (
                      // <TextInput requirement={requirement} onChangeCallback={setRequirementsList} />
                      <input
                        type={'text'}
                        onChange={(e) =>
                          setRequirementsList(
                            requirementsList.map((r) => (r.id === requirement.id ? { ...r, value: e.target.value } : r))
                          )
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </Form>

        <Button className={'w-auto mt-3'}>Zapisz zmiany</Button>
      </Row>
    </>
  )
}

export default ActivityRequirements
