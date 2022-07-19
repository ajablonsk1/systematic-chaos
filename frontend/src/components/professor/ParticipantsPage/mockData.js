const groups = [
  {
    groupName: 'pon1440',
    groupKey: 'pon1440',
    participants: [
      {
        id: 1,
        name: 'Jan Kowalski',
        groupName: 'pon1440',
        grade: 3.5
      },
      {
        id: 2,
        name: 'Jan Nowak',
        groupName: 'pon1440',
        grade: 4.0
      },
      {
        id: 3,
        name: 'Janusz Tracz',
        groupName: 'pon1440',
        grade: 3.0
      },
      {
        id: 4,
        name: 'Józef Nowacki',
        groupName: 'pon1440',
        grade: 5.0
      },
      {
        id: 5,
        name: 'Maciej Maciejowski',
        groupName: 'pon1440',
        grade: 4.5
      }
    ]
  },
  {
    groupName: 'wt1250',
    groupKey: 'wt1250',
    participants: [
      {
        id: 6,
        name: 'Iwan Groźny',
        groupName: 'wt1250',
        grade: 4.5
      },
      {
        id: 7,
        name: 'Marian Cis',
        groupName: 'wt1250',
        grade: 5.0
      },
      {
        id: 8,
        name: 'Mikołaj Nowak',
        groupName: 'wt1250',
        grade: 4.5
      },
      {
        id: 9,
        name: 'Patrycja Dudziak',
        groupName: 'wt1250',
        grade: 3.0
      },
      {
        id: 10,
        name: 'Filip Falafel',
        groupName: 'wt1250',
        grade: 3.5
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
