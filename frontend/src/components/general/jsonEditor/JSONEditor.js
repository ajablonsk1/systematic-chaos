import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'

/* @important:
 * The used 'react-json-editor-ajrm' library has a cursor position bug.
 * When we save the state of the edited json (onChange), our cursor is moved to the very beginning of the file,
 * which is annoying.
 * The solution is a simple trick: in the function triggered by onChange we save the cursor state before the rerender
 * and after moving the cursor to the beginning we set it to where it was before
 *
 * @props
 *  - jsonConfig - json for editing
 * */

const JSONEditor = forwardRef((props, ref) => {
  const [editedJson, setEditedJson] = useState(props.jsonConfig)
  const jsonInputRef = useRef()

  /* When user clicks Delete key, the cursor position is the same as before deletion,
   * so number type setState not working (no change).
   * This is main reason why I use object instead of number
   * */
  const [cursorPosition, setCursorPosition] = useState({})

  const getJson = () => {
    return editedJson
  }

  useImperativeHandle(ref, () => ({
    getJson
  }))

  useEffect(() => {
    if (cursorPosition) {
      jsonInputRef.current?.setCursorPosition(cursorPosition.pos)
    }
  }, [cursorPosition])

  const editJsonObject = (e) => {
    const cursorPositionBeforeRerender = jsonInputRef.current?.getCursorPosition()
    setEditedJson(e.jsObject)
    setCursorPosition({ pos: cursorPositionBeforeRerender })
  }

  return (
    <JSONInput
      ref={jsonInputRef}
      placeholder={props.jsonConfig}
      locale={locale}
      height='100%'
      width={'100%'}
      style={{ body: { fontSize: '15px' }, outerBox: { maxHeight: '60vh', overflowY: 'auto' } }}
      onChange={editJsonObject}
      waitAfterKeyPress={100}
    />
  )
})

JSONEditor.displayName = 'JSONEditor'

export default JSONEditor
