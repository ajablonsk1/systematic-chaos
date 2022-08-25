import warrior1 from '../../../student/BadgesPage/images/warrior1.png'
import warrior2 from '../../../student/BadgesPage/images/warrior.png'
import warrior3 from '../../../student/BadgesPage/images/swordsman.png'
import warrior4 from '../../../student/BadgesPage/images/knight.png'
import warrior5 from '../../../student/BadgesPage/images/knightHorse.png'
import wizard1 from '../../../student/BadgesPage/images/wizard1.png'
import wizard2 from '../../../student/BadgesPage/images/wizard2.png'
import wizard3 from '../../../student/BadgesPage/images/wizard3.png'
import wizard4 from '../../../student/BadgesPage/images/wizard4.png'
import wizard5 from '../../../student/BadgesPage/images/wizard5.png'
import priest1 from '../../../student/BadgesPage/images/priest1.png'
import priest2 from '../../../student/BadgesPage/images/priest2.png'
import priest3 from '../../../student/BadgesPage/images/priest3.png'
import priest4 from '../../../student/BadgesPage/images/priest4.png'
import priest5 from '../../../student/BadgesPage/images/priest5.png'
import rogue1 from '../../../student/BadgesPage/images/rogue1.png'
import rogue2 from '../../../student/BadgesPage/images/rogue2.png'
import rogue3 from '../../../student/BadgesPage/images/rogue3.png'
import rogue4 from '../../../student/BadgesPage/images/rogue4.png'
import rogue5 from '../../../student/BadgesPage/images/rogue5.png'
import { HeroType } from '../../../../utils/userRole'

const warriorRanks = [
  {
    name: 'Chłop',
    minPoints: 0,
    maxPoints: 100,
    imgSrc: warrior1
  },
  {
    name: 'Giermek',
    minPoints: 101,
    maxPoints: 200,
    imgSrc: warrior2
  },
  {
    name: 'Wojownik',
    minPoints: 201,
    maxPoints: 300,
    imgSrc: warrior3
  },
  {
    name: 'Rycerz',
    minPoints: 301,
    maxPoints: 400,
    imgSrc: warrior4
  },
  {
    name: 'Paladyn',
    minPoints: 401,
    maxPoints: 500,
    imgSrc: warrior5
  }
]

const wizardRanks = [
  {
    name: 'Adept magii',
    minPoints: 0,
    maxPoints: 100,
    imgSrc: wizard1
  },
  {
    name: 'Początkujący czarnoksiężnik',
    minPoints: 101,
    maxPoints: 200,
    imgSrc: wizard2
  },
  {
    name: 'Czarnoksiężnik',
    minPoints: 201,
    maxPoints: 300,
    imgSrc: wizard3
  },
  {
    name: 'Mistrz magii',
    minPoints: 301,
    maxPoints: 400,
    imgSrc: wizard4
  },
  {
    name: 'Arcymistrz magii',
    minPoints: 401,
    maxPoints: 500,
    imgSrc: wizard5
  }
]

const priestRanks = [
  {
    name: 'Duchowny',
    minPoints: 0,
    maxPoints: 100,
    imgSrc: priest1
  },
  {
    name: 'Mnich',
    minPoints: 101,
    maxPoints: 200,
    imgSrc: priest2
  },
  {
    name: 'Inkwizytor',
    minPoints: 201,
    maxPoints: 300,
    imgSrc: priest3
  },
  {
    name: 'Kapłan',
    minPoints: 301,
    maxPoints: 400,
    imgSrc: priest4
  },
  {
    name: 'Arcykapłan',
    minPoints: 401,
    maxPoints: 500,
    imgSrc: priest5
  }
]

const rogueRanks = [
  {
    name: 'Złodziej',
    minPoints: 0,
    maxPoints: 100,
    imgSrc: rogue1
  },
  {
    name: 'Zwiadowca',
    minPoints: 101,
    maxPoints: 200,
    imgSrc: rogue2
  },
  {
    name: 'Zabójca',
    minPoints: 201,
    maxPoints: 300,
    imgSrc: rogue3
  },
  {
    name: 'Skrytobójca',
    minPoints: 301,
    maxPoints: 400,
    imgSrc: rogue4
  },
  {
    name: 'Przywódca bractwa',
    minPoints: 401,
    maxPoints: 500,
    imgSrc: rogue5
  }
]

export const getRanksData = () => {
  return [
    {
      heroType: HeroType.WARRIOR,
      ranksList: warriorRanks
    },
    {
      heroType: HeroType.WIZARD,
      ranksList: wizardRanks
    },
    {
      heroType: HeroType.PRIEST,
      ranksList: priestRanks
    },
    {
      heroType: HeroType.ROGUE,
      ranksList: rogueRanks
    }
  ]
}
