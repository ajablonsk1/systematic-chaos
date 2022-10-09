import { useState } from 'react'
import { renderHook, act } from '@testing-library/react'
import {
  onCheckboxChange,
  onInputChange,
  onMultiSelectChange,
  onSelectChange,
  onSwitchChange
} from '../../components/professor/GameManagement/ActivityDetails/ActivityRequirements/formHelpers'
import { RequirementType } from '../../utils/constants'

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

describe('Multiselect input tests:', () => {
  const multiselectList = [
    { id: 1, list: ['test1', 'test2', 'test3'] },
    { id: 2, list: ['test4', 'test5', 'test6'] }
  ]

  it('should return empty answer list and unselected if multiselectList is empty', () => {
    // given
    const emptyMultiselectList = []
    const { result } = renderHook(() =>
      useState([{ id: requirementId, answer: ['selectTest'], selected: false, type: RequirementType.MULTI_SELECT }])
    )

    // when
    act(() => {
      onMultiSelectChange(result.current[1], emptyMultiselectList)
    })

    // then
    expect(result.current[0]).toHaveLength(1)
    expect(result.current[0][0]).toMatchObject({
      id: requirementId,
      answer: [],
      selected: false,
      type: RequirementType.MULTI_SELECT
    })
  })
  it('should return empty answer list and unselected if multiselect not contains given requirementId', () => {
    // given
    const { result } = renderHook(() =>
      useState([{ id: requirementId, answer: ['selectTest'], selected: false, type: RequirementType.MULTI_SELECT }])
    )

    // when
    act(() => {
      onMultiSelectChange(result.current[1], [multiselectList[1]])
    })

    // then
    expect(result.current[0]).toHaveLength(1)
    expect(result.current[0][0]).toMatchObject({
      id: requirementId,
      answer: [],
      selected: false,
      type: RequirementType.MULTI_SELECT
    })
  })
  it('should return new answer list and selected value true if multiselect list contains given requirementId', () => {
    // given
    const { result } = renderHook(() =>
      useState([{ id: requirementId, answer: ['selectTest'], selected: false, type: RequirementType.MULTI_SELECT }])
    )

    // when
    act(() => {
      onMultiSelectChange(result.current[1], multiselectList)
    })

    // then
    expect(result.current[0]).toHaveLength(1)
    expect(result.current[0][0]).toMatchObject({
      id: requirementId,
      answer: multiselectList[0].list,
      selected: true,
      type: RequirementType.MULTI_SELECT
    })
  })
  it('should return the same requirements list if given requirement type is not "multi_select" or is undefined', () => {
    // given
    const exampleRequirement = {
      id: requirementId,
      answer: ['selectTest'],
      selected: false,
      type: RequirementType.TEXT
    }
    const { result: result1 } = renderHook(() => useState([exampleRequirement]))
    const { result: result2 } = renderHook(() => useState([{ ...exampleRequirement, type: undefined }]))

    // when
    act(() => {
      onMultiSelectChange(result1.current[1], multiselectList)
      onMultiSelectChange(result2.current[1], multiselectList)
    })

    // then
    expect(result1.current[0]).toHaveLength(1)
    expect(result2.current[0]).toHaveLength(1)
    expect(result1.current[0][0]).toMatchObject(exampleRequirement)
    expect(result2.current[0][0]).toMatchObject({ ...exampleRequirement, type: undefined })
  })
})
