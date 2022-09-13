import { RequirementType } from '../../../../../utils/constants'

export const onInputChange = (requirementId, value, setRequirementsList) => {
  setRequirementsList((prevState) =>
    prevState?.map((requirement) =>
      requirement.id === requirementId ? { ...requirement, answer: value } : requirement
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
        ? { ...requirement, value: !requirement.value, answer: !requirement.value }
        : requirement
    )
  )
}

export const onSelectChange = (requirementId, value, setRequirementsList) => {
  setRequirementsList((prevState) =>
    prevState?.map((requirement) =>
      requirement.id === requirementId ? { ...requirement, answer: value } : requirement
    )
  )
}

export const onMultiSelectChange = (setRequirementsList, multiSelectLists) => {
  setRequirementsList((prevState) =>
    prevState?.map((requirement) =>
      requirement.type === RequirementType.MULTI_SELECT
        ? {
            ...requirement,
            answer: multiSelectLists.find((list) => list.id === requirement.id)?.list ?? []
          }
        : requirement
    )
  )
}
