import { getFormData, isCorrectBody } from '../../utils/axiosHelper'

const incorrectBodyExamples = [17, true, 'test', Number.MAX_SAFE_INTEGER, NaN]

describe('Form data getter tests:', () => {
  it('should return empty form data values for empty body', () => {
    // given
    const exampleBody = {}

    // when
    const formData = getFormData(exampleBody)

    // then
    expect([...formData.values()]).toHaveLength(0)
    expect([...formData.keys()]).toHaveLength(0)
  })
  it('should return nothing for undefined/null body', () => {
    // given
    const exampleBody = null

    // when
    const formData = getFormData(exampleBody)

    // then
    expect(formData).toBeUndefined()
  })
  it('should return correct form data for correct body object', () => {
    // given
    const exampleBody = { name: 'Test', age: 17, arr: [1, 2] }

    // when
    const formData = getFormData(exampleBody)

    // then
    expect([...formData.keys()]).toMatchObject(['name', 'age', 'arr'])
    expect([...formData.values()]).toMatchObject(['Test', '17', '1,2'])
    expect([...formData.entries()]).toMatchObject([
      ['name', 'Test'],
      ['age', '17'],
      ['arr', '1,2']
    ])
  })
  it.each(incorrectBodyExamples)('should return nothing for primitive data type: %s', (exampleBody) => {
    // when
    const formData = getFormData(exampleBody)

    // then
    expect(formData).toBeUndefined()
  })
})

describe('Tests checking if the given variable has the correct type:', () => {
  const correctBodies = [[1, 2, 3], { name: 'Test' }]

  it.each(correctBodies)('should return true for Array and Object types', (bodyExample) => {
    // when
    const isCorrectBodyObject = isCorrectBody(bodyExample)

    // then
    expect(isCorrectBodyObject).toBeTruthy()
  })
  it.each([...incorrectBodyExamples, null, undefined])('should return false for Primitive types', (bodyExample) => {
    // when
    const isCorrectBodyObject = isCorrectBody(bodyExample)

    // then
    expect(isCorrectBodyObject).toBeFalsy()
  })
})
