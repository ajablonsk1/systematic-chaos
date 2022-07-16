let groups = [
  {
    name: 'pn-1440A',
    code: 'pn-1440A'
  },
  {
    name: 'pn-1440B',
    code: 'pn-1440B'
  },
  {
    name: 'wt-1620A',
    code: 'wt-1620A'
  },
  {
    name: 'wt-1640A',
    code: 'wt-1640A'
  },
  {
    name: 'sr-1320A',
    code: 'sr-1320A'
  },
  {
    name: 'grupa-X',
    code: 'grupa-X'
  },
  {
    name: 'grupa-Y',
    code: 'grupa-Y'
  },
  {
    name: 'gr-12-32-41',
    code: 'gr-12-32-41'
  },
  {
    name: 'x-grupa',
    code: 'x-grupa'
  },
  {
    name: 'supergrupa',
    code: 'supergrupa'
  },
  {
    name: 'x-grupa',
    code: 'x-grupa'
  },
  {
    name: 'supergrupa1',
    code: 'supergrupa1'
  },
  {
    name: 'x1-grupa',
    code: 'x1-grupa'
  },
  {
    name: 'supergrupa2',
    code: 'supergrupa2'
  }
]

export const AddGroupResults = {
  NAME_TAKEN_ERROR: 'Nazwa grupy jest zajęta',
  CODE_TAKEN_ERROR: 'Kod grupy jest zajęty',
  SUCCESS: 'Grupa została dodana'
}

export function getTableContent() {
  return groups
}

export function addGroup(name, code) {
  let erorrs = []

  if (groups.filter((group) => group.name === name).length > 0) erorrs.push(AddGroupResults.NAME_TAKEN_ERROR)
  if (groups.filter((group) => group.code === code).length > 0) erorrs.push(AddGroupResults.CODE_TAKEN_ERROR)

  if (erorrs.length > 0) return erorrs
  else {
    groups.push({
      name: name,
      code: code
    })
    return AddGroupResults.SUCCESS
  }
}
