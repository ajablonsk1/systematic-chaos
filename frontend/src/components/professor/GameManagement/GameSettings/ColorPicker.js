import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { getTextColor } from './textColorHelper'
import { ColorDiv } from './ColorPickerStyle'
import { PhotoshopPicker } from 'react-color'

function ColorPicker(props) {
  const [colors, setColors] = useState([])
  const [selectedColorId, setSelectedColorId] = useState(null)
  const [isColorPickerModalOpen, setIsColorPickerModalOpen] = useState(false)
  const [newColor, setNewColor] = useState('#ffffff')

  useEffect(() => {
    setColors(props.colors)
  }, [props.colors])

  useEffect(() => {
    setSelectedColorId(props.selectedColorId)
  }, [props.selectedColorId])

  const addColor = () => {
    if (!!newColor) {
      setColors([...colors, newColor])
    }
    setIsColorPickerModalOpen(false)
  }

  return (
    <div className={'mb-4'}>
      <h5>{props.header}</h5>
      <div className={'d-flex gap-2'}>
        {colors.map((color, index) => (
          <ColorDiv key={index + Date.now()} $backgroundColor={color} onClick={() => setSelectedColorId(index)}>
            {index === selectedColorId && <FontAwesomeIcon icon={faCheck} color={getTextColor(color)} />}
          </ColorDiv>
        ))}
        <ColorDiv>
          <FontAwesomeIcon
            cursor={'pointer'}
            icon={faPlus}
            onClick={() => setIsColorPickerModalOpen(!isColorPickerModalOpen)}
          />
          {isColorPickerModalOpen && (
            <div className={'position-absolute top-100 start-100'} style={{ zIndex: 2 }}>
              <PhotoshopPicker
                color={newColor}
                onChange={(c) => setNewColor(c.hex)}
                onCancel={() => setIsColorPickerModalOpen(false)}
                onAccept={addColor}
              />
            </div>
          )}
        </ColorDiv>
      </div>
    </div>
  )
}

export default ColorPicker
