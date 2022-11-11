import React from 'react'
import { HeroType } from '../../../../../utils/userRole'
import ExpeditionService from '../../../../../services/expedition.service'
import WizardSuperPower from './HeroSuperPower/WizardSuperPower'
import WarriorSuperPower from './HeroSuperPower/WarriorSuperPower'
import RogueSuperPower from './HeroSuperPower/RogueSuperPower'
import PriestSuperPower from './HeroSuperPower/PriestSuperPower'

function SuperPower(props) {
  const userHeroType = localStorage.getItem('heroType')
  const powerUse = (questionId = undefined) => ExpeditionService.startSuperPower(props.activityId, questionId)
  const checkPowerCanBeUsed = () => ExpeditionService.checkSuperPowerCanBeUsed(props.activityId)

  const contentMapper = {
    [HeroType.WIZARD]: (
      <WizardSuperPower
        status={props.status}
        usePower={powerUse}
        useCheck={checkPowerCanBeUsed}
        questions={props.questions}
      />
    ),
    [HeroType.WARRIOR]: (
      <WarriorSuperPower
        status={props.status}
        usePower={powerUse}
        useCheck={checkPowerCanBeUsed}
        questions={props.questions}
      />
    ),
    [HeroType.ROGUE]: <RogueSuperPower status={props.status} usePower={powerUse} useCheck={checkPowerCanBeUsed} />,
    [HeroType.PRIEST]: (
      <PriestSuperPower setRemainingTime={props.setRemainingTime} usePower={powerUse} useCheck={checkPowerCanBeUsed} />
    )
  }

  return contentMapper[userHeroType]
}

export default SuperPower
