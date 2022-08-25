import React from 'react'
import { CustomTable } from '../../../student/GameCardPage/gameCardContentsStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

function Table(props) {
  return (
    <CustomTable style={{ marginTop: 10 }}>
      <thead>
        <tr>
          {props.headers.map((headElement, index) => (
            <th key={index + Date.now()}>{headElement}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.body.map((bodyElement, i) => (
          <tr key={i + Date.now()}>
            {bodyElement.map((element, index) => (
              <td key={index + Date.now()} className={'align-middle'}>
                {element}
              </td>
            ))}
            <td className={'align-middle'}>
              <FontAwesomeIcon icon={faEdit} />
            </td>
            <td className={'align-middle'}>
              <FontAwesomeIcon icon={faTrash} />
            </td>
          </tr>
        ))}
      </tbody>
    </CustomTable>
  )
}

export default Table
