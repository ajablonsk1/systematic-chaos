import moment from 'moment'
import { RequirementType } from '../../../../utils/constants'

export const getRequirements = () => [
  {
    id: 1,
    name: 'Data zamknięcia aktywności',
    value: moment(Date.now()).add(2, 'days').format('DD.MM.YYYY, HH:mm'),
    type: RequirementType.DATE,
    selected: true
  },
  {
    id: 2,
    name: 'Liczba punktów min',
    value: 700,
    type: RequirementType.NUMBER,
    selected: true
  },
  {
    id: 3,
    name: 'Postęp w rozdziale (%)',
    value: 55,
    type: RequirementType.NUMBER,
    selected: true
  },
  {
    id: 4,
    name: 'Liczba wykonanych aktywności',
    value: 8,
    type: RequirementType.NUMBER,
    selected: true
  },
  {
    id: 5,
    name: 'Czy inne aktywności w rozdziale muszą zostać wykonane?',
    value: true,
    type: RequirementType.BOOLEAN,
    selected: true
  },
  {
    id: 6,
    name: 'Dostępne dla określonej grupy osób',
    value: ['jgorski@student.agh.edu.pl'],
    type: RequirementType.MULTI_SELECT,
    selected: true
  },
  {
    id: 7,
    name: 'Dostępne dla grupy o podanej nazwie',
    value: 'pn1440B',
    type: RequirementType.TEXT,
    selected: true
  },
  {
    id: 8,
    name: 'Dostępne po wykonaniu aktywności',
    value: ['Ekspedycja 1', 'Zadanie bojowe 1'],
    type: RequirementType.SELECT,
    selected: true
  }
]
