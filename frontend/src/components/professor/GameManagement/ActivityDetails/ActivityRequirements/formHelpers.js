import { debounce } from 'lodash'

export const onTextInputChange = (requirementId, value, setRequirementsList) => {
  // const debouncedTextChange = debounce((requirementId, value) => {
  //   setRequirementsList((prevState) =>
  //     prevState.map((requirement) =>
  //       requirement.id === requirementId ? { ...requirement, value: value } : requirement
  //     )
  //   )
  // }, 1000)
  //
  // debouncedTextChange(requirementId, value)
  setRequirementsList((prevState) =>
    prevState.map((requirement) => (requirement.id === requirementId ? { ...requirement, value: value } : requirement))
  )
}

export const toggleSelect = (requirementId, setRequirementsList) => {
  setRequirementsList((prevState) =>
    prevState.map((requirement) =>
      requirement.id === requirementId ? { ...requirement, selected: !requirement.selected } : requirement
    )
  )
}
