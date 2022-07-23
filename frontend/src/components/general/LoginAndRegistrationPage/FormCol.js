import { ErrorMessage, Field } from 'formik'
import { Col } from 'react-bootstrap'

export const FormCol = (name, type, colName, size = 12, additionalOptions) => {
  return (
    <Col className='form-group' md={size}>
      <h6>{name}</h6>
      {type === 'select' ? (
        <Field className='form-control' name={colName} as={'select'} multiple={additionalOptions?.multiple ?? false}>
          {additionalOptions?.options?.map((option, index) => (
            <option key={option.value + index} value={option.value}>
              {option.name}
            </option>
          ))}
        </Field>
      ) : type === 'checkbox' ? (
        <div style={{ maxHeight: '100px', overflow: 'auto' }}>
          {additionalOptions?.options?.map((option, index) => (
            <div key={option.value + index} className={'w-100'}>
              <label className={'d-flex align-items-center'}>
                <Field
                  className='form-control h-25 mx-2'
                  style={{ width: 'inherit' }}
                  type={type}
                  name={colName}
                  value={option.value}
                />{' '}
                <span>{option.name}</span>
              </label>
            </div>
          ))}
        </div>
      ) : (
        <Field
          className='form-control'
          type={type}
          name={colName}
          min={type === 'number' ? additionalOptions?.min ?? 0 : 'none'}
        />
      )}

      <ErrorMessage name={colName} component='div'>
        {(msg) => <div style={{ color: 'var(--font-color)' }}>{msg}</div>}
      </ErrorMessage>
    </Col>
  )
}
