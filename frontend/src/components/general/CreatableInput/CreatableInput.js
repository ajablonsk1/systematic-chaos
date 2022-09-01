import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { uniqBy } from 'lodash'

const createOption = (label) => ({
  label,
  value: label
})

const WORD_MAX_LEN = 80

function CreatableInput(props) {
  const [inputValue, setInputValue] = useState('')
  const [labels, setLabels] = useState(
    props.defaultValues ? props.defaultValues.map((value) => createOption(value)) : []
  )

  const addLabel = (value) => {
    const newLabels = uniqBy([...labels, createOption(value)], 'value')
    setLabels(newLabels)
    props.onChangeCallback(newLabels.map((label) => label.value))
  }

  const onLabelsChange = (newLabels) => {
    setLabels(newLabels)
    props.onChangeCallback(newLabels.map((label) => label.value))
  }

  const handleKeyDown = (event) => {
    if (!inputValue) return

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        addLabel(inputValue)
        setInputValue('')
        event.preventDefault()
        break
      default:
        break
    }
  }

  const handleInputChange = (value) => {
    if (value.length < WORD_MAX_LEN) {
      setInputValue(value)
    }
  }

  return (
    <CreatableSelect
      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={onLabelsChange} // on change labels list
      onInputChange={handleInputChange} // on change actual writing input
      onKeyDown={handleKeyDown}
      placeholder='Wpisz coś i kliknij enter...'
      value={labels}
    />
  )
}

export default CreatableInput
