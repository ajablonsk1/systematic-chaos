import React from 'react'
import ReactTooltip from 'react-tooltip'

function Tooltip(props) {
  return (
    <ReactTooltip
      id={props.id}
      place={'top'}
      type={'dark'}
      effect={'solid'}
      multiline
      event='mouseover mouseenter'
      eventOff='mouseleave mouseout scroll mousewheel blur'
    />
  )
}

export default Tooltip
