const groups = [
  {
    groupName: 'pon1440',
    groupKey: 'pon1440',
    participants: [
      {
        name: 'Jan Kowalski',
        groupName: 'pon1440'
      },
      {
        name: 'Jan Nowak',
        groupName: 'pon1440'
      },
      {
        name: 'Janusz Tracz',
        groupName: 'pon1440'
      },
      {
        name: 'Józef Nowacki',
        groupName: 'pon1440'
      },
      {
        name: 'Maciej Maciejowski',
        groupName: 'pon1440'
      }
    ]
  },
  {
    groupName: 'wt1250',
    groupKey: 'wt1250',
    participants: [
      {
        name: 'Iwan Groźny',
        groupName: 'wt1250'
      },
      {
        name: 'Marian Cis',
        groupName: 'wt1250'
      },
      {
        name: 'Mikołaj Nowak',
        groupName: 'wt1250'
      },
      {
        name: 'Patrycja Dudziak',
        groupName: 'wt1250'
      },
      {
        name: 'Filip Falafel',
        groupName: 'wt1250'
      }
    ]
  }
]

export const getGroups = () => {
  return groups
}

export const getAllParticipants = () => {
  return {
    groupName: 'Wszyscy',
    groupKey: 'all',
    participants: groups.length === 0 ? [] : groups.map((group) => group.participants).flat(1)
  }
}
