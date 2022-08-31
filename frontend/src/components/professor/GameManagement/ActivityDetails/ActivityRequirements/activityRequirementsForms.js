import React from 'react'
import { Form } from 'react-bootstrap'
import { onTextInputChange, toggleSelect } from './formHelpers'
import { RequirementType } from '../../../../../utils/constants'

export const TextInput = (props) => {
  return (
    <Form.Control
      key={'key'}
      type={'text'}
      className={'w-100'}
      value={props.requirement.value}
      onChange={(e) => onTextInputChange(props.requirement.id, e.target.value, props.onChangeCallback)}
    />
  )
}

export const CheckBox = (props) => {
  return (
    <Form.Check
      type={props.requirement.type === RequirementType.BOOLEAN ? 'switch' : 'checkbox'}
      id={props.requirement.id}
      checked={props.requirement.selected}
      onChange={() => toggleSelect(props.requirement.id, props.onChangeCallback)}
    />
  )
}
