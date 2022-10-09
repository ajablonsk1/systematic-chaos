import { RequirementType } from '../../../../../utils/constants'

export const onInputChange = (requirementId, value, setRequirementsList) => {
  setRequirementsList((prevState) =>
    prevState?.map((requirement) =>
      requirement.id === requirementId ? { ...requirement, answer: value, selected: true } : requirement
    )
  )
}

export const onCheckboxChange = (requirementId, setRequirementsList) => {
  setRequirementsList((prevState) =>
    prevState?.map((requirement) =>
      requirement.id === requirementId ? { ...requirement, selected: !requirement.selected } : requirement
    )
  )
}

export const onSwitchChange = (requirementId, setRequirementsList) => {
  setRequirementsList((prevState) =>
    prevState?.map((requirement) =>
      requirement.id === requirementId
        ? { ...requirement, value: !requirement.value, answer: !requirement.value, selected: true }
        : requirement
    )
  )
}

export const onSelectChange = (requirementId, value, setRequirementsList) => {
  setRequirementsList((prevState) =>
    prevState?.map((requirement) =>
      requirement.id === requirementId ? { ...requirement, answer: value, selected: true } : requirement
    )
  )
}

export const onMultiSelectChange = (setRequirementsList, multiSelectLists) => {
  setRequirementsList((prevState) =>
    prevState?.map((requirement) => {
      const multiSelectRequirement = multiSelectLists.find((list) => list.id === requirement.id)
      return requirement.type?.toLowerCase() === RequirementType.MULTI_SELECT
        ? {
            ...requirement,
            answer: multiSelectRequirement?.list ?? [],
            selected: !!multiSelectRequirement
          }
        : requirement
    })
  )
}
