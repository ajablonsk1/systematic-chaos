import { Field } from 'formik'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const FormikTextarea = styled(Field)`
  width: 80%;
  color: var(--font-color);
  border: 1px solid var(--font-color);
  background-color: var(--dark-blue);
`

export const FormikRange = styled(Field)`
  width: 82%;
  accent-color: var(--button-green);
`

export const FormButton = styled(Button)`
  background-color: var(--button-green);
  border-color: var(--button-green);
`
