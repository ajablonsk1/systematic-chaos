import React from 'react'
import { CustomTable } from '../../../student/GameCardPage/gameCardContentsStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

function Table(props) {
  return (
    <CustomTable
      style={{ marginTop: 10 }}
      $fontColor={props.theme.font}
      $borderColor={props.theme.primary}
      $background={props.theme.secondary}
    >
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
              <FontAwesomeIcon icon={faEdit} onClick={() => props.editIconCallback(i)} />
            </td>
            <td className={'align-middle'}>
              <FontAwesomeIcon icon={faTrash} onClick={props.deleteIconCallback} />
            </td>
          </tr>
        ))}
      </tbody>
    </CustomTable>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(Table)
