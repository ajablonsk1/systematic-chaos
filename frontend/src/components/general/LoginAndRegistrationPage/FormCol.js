import { ErrorMessage, Field } from 'formik'
import { Col } from 'react-bootstrap'

export const FormCol = (name, type, colName) => {
  return (
    <Col className='form-group' xs={12}>
      <h6>{name}</h6>
      <Field className='form-control' type={type} name={colName} />
      <ErrorMessage name={colName} component='div'>
        {(msg) => <div style={{ color: 'var(--font-color)' }}>{msg}</div>}
      </ErrorMessage>
    </Col>
  )
}
