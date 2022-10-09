import { useState } from 'react'
import { renderHook, act } from '@testing-library/react'
import {
  onCheckboxChange,
  onInputChange,
  onSelectChange,
  onSwitchChange
} from '../../components/professor/GameManagement/ActivityDetails/ActivityRequirements/formHelpers'

// global given
const requirementId = 1
const value = 'Test'

describe('Input type field tests:', () => {
  // The test below works for all helper functions, so I don't repeat it for other test blocks
  it('should return the same list if prevState exists and is not empty, but requirementId is not found', () => {
    // given
    const { result } = renderHook(() => useState([{ id: 0, answer: 'empty', selected: false }]))

    // when
    act(() => {
      onInputChange(requirementId, value, result.current[1])
    })

    // then
    expect(result.current[0]).toHaveLength(1)
    expect(result.current[0][0]).toMatchObject({ id: 0, answer: 'empty', selected: false })
  })
  it('should return updated list if prevState exists and is not empty and requirementId is found', () => {
    // given
    const { result } = renderHook(() => useState([{ id: 1, answer: 'X', selected: false }]))

    // when
    act(() => {
      onInputChange(requirementId, value, result.current[1])
    })

    // then
    expect(result.current[0]).toHaveLength(1)
    expect(result.current[0][0]).toMatchObject({ id: 1, answer: 'Test', selected: true })
  })
  // The test below works for all helper functions, so I don't repeat it for other test blocks
  it('should return empty list if prevState exists but is empty', () => {
    // given
    const { result } = renderHook(() => useState([]))

    // when
    act(() => {
      onInputChange(requirementId, value, result.current[1])
    })

    // then
    expect(result.current[0]).toHaveLength(0)
    expect(result.current[0]).toMatchObject([])
  })
  // The test below works for all helper functions, so I don't repeat it for other test blocks
  it('should return undefined if prevState does not exists', () => {
    // given
    const { result } = renderHook(() => useState())

    // when
    act(() => {
      onInputChange(requirementId, value, result.current[1])
    })

    // then
    expect(result.current[0]).toBeUndefined()
  })
})

describe('Checkbox input tests:', () => {
  it('should return updated list if prevState exists and is not empty and requirementId is found', () => {
    // given
    const { result } = renderHook(() =>
      useState([
        { id: 1, selected: false },
        { id: 2, selected: true }
      ])
    )

    // when
    act(() => {
      onCheckboxChange(1, result.current[1])
      onCheckboxChange(2, result.current[1])
    })

    // then
    expect(result.current[0]).toHaveLength(2)
    expect(result.current[0]).toEqual(
      expect.arrayContaining([
        { id: 1, selected: true },
        { id: 2, selected: false }
      ])
    )
  })
})

describe('Switch input tests:', () => {
  const checkboxElements = [
    { id: 1, value: true, answer: false, selected: false },
    { id: 2, value: true, answer: true, selected: false },
    { id: 3, value: false, answer: true, selected: false },
    { id: 4, value: false, answer: false, selected: false }
  ]

  it.each(checkboxElements)(
    'should return updated list if prevState exists and is not empty and requirementId is found: %s',
    (checkboxElement) => {
      // given
      const { result } = renderHook(() => useState([checkboxElement]))

      // when
      act(() => {
        onSwitchChange(checkboxElement.id, result.current[1])
      })

      // then
      expect(result.current[0]).toHaveLength(1)
      expect(result.current[0]).toMatchObject([
        { id: checkboxElement.id, value: !checkboxElement.value, answer: !checkboxElement.value, selected: true }
      ])
    }
  )
})

describe('Select input tests:', () => {
  it('should return updated list if prevState exists and is not empty and requirementId is found', () => {
    // given
    const { result } = renderHook(() => useState([{ id: requirementId, answer: 'selectTest', selected: false }]))

    // when
    act(() => {
      onSelectChange(requirementId, value, result.current[1])
    })

    // then
    expect(result.current[0]).toHaveLength(1)
    expect(result.current[0][0]).toMatchObject({ id: requirementId, answer: value, selected: true })
  })
})
