import React from 'react'
import { Form } from 'react-bootstrap'
import { onInputChange, onCheckboxChange, onSwitchChange, onSelectChange } from './formHelpers'

export const Input = (props) => {
  return (
    <Form.Control
      type={props.requirement.type}
      className={'w-100'}
      value={props.requirement.answer ?? props.requirement.value ?? '0'}
      onChange={(e) => onInputChange(props.requirement.id, e.target.value, props.onChangeCallback)}
    />
  )
}

export const CheckBox = (props) => {
  return (
    <Form.Check
      type={'checkbox'}
      id={props.requirement.id}
      checked={props.requirement.selected}
      onChange={() => onCheckboxChange(props.requirement.id, props.onChangeCallback)}
    />
  )
}

export const Switch = (props) => {
  return (
    <Form.Check
      type={'switch'}
      id={props.requirement.id}
      checked={props.requirement.answer ?? props.requirement.value}
      onChange={() => onSwitchChange(props.requirement.id, props.onChangeCallback)}
    />
  )
}

export const Select = (props) => {
  return (
    <Form.Select onChange={(e) => onSelectChange(props.requirement.id, e.target.value, props.onChangeCallback)}>
      {props.requirement.value.map((option, index) => (
        <option key={'option' + index} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  )
}
