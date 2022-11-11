import React from 'react'
import { HeroType } from '../../../../../utils/userRole'
import ExpeditionService from '../../../../../services/expedition.service'

import RogueSuperPower from './HeroSuperPower/RogueSuperPower'
import PriestSuperPower from './HeroSuperPower/PriestSuperPower'
import WizardAndWarriorSuperPower from './HeroSuperPower/WizardAndWarriorSuperPower'

function SuperPower(props) {
  const userHeroType = localStorage.getItem('heroType')
  const powerUse = (questionId = undefined) => ExpeditionService.startSuperPower(props.activityId, questionId)
  const checkPowerCanBeUsed = () => ExpeditionService.checkSuperPowerCanBeUsed(props.activityId)

  const wizardAndWarriorSuperPowerComponent = (storageKey) => {
    return (
      <WizardAndWarriorSuperPower
        status={props.status}
        usePower={powerUse}
        useCheck={checkPowerCanBeUsed}
        questions={props.questions}
        storageKey={storageKey}
      />
    )
  }

  const contentMapper = {
    [HeroType.WIZARD]: wizardAndWarriorSuperPowerComponent('questionPoints'),
    [HeroType.WARRIOR]: wizardAndWarriorSuperPowerComponent('questionType'),
    [HeroType.ROGUE]: <RogueSuperPower status={props.status} usePower={powerUse} useCheck={checkPowerCanBeUsed} />,
    [HeroType.PRIEST]: (
      <PriestSuperPower setRemainingTime={props.setRemainingTime} usePower={powerUse} useCheck={checkPowerCanBeUsed} />
    )
  }

  return contentMapper[userHeroType]
}

export default SuperPower
