import { Field } from 'formik'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const FormikTextarea = styled(Field)`
  width: 80%;
  color: ${(props) => props.$fontColor};
  border: 1px solid ${(props) => props.$fontColor};
  background-color: ${(props) => props.$background};
`

export const FormikRange = styled(Field)`
  width: 82%;
  accent-color: var(--button-green);
`

export const FormButton = styled(Button)`
  background-color: var(--button-green);
  border-color: var(--button-green);
`
