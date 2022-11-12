import React, { useState, useEffect } from 'react'
import SuperPowerTrigger from '../SuperPowerTrigger'
import { useRogueSuperPowerCheck } from '../../../../../../hooks/useSuperPowerCheck'

function RogueSuperPower(props) {
  const [superPowerInfo, setSuperPowerInfo] = useState(undefined)

  const superPowerCanBeUsed = useRogueSuperPowerCheck(props.useCheck, superPowerInfo, props.status)

  useEffect(() => {
    if (superPowerInfo?.value) {
      window.location.reload()
    }
  }, [superPowerInfo])

  const startUsingSuperPower = () => {
    if (!superPowerCanBeUsed?.canBeUsed) {
      return
    }

    props
      .usePower()
      .then((response) => {
        setSuperPowerInfo(response)
      })
      .catch(() => {
        setSuperPowerInfo(null)
      })
  }

  return <SuperPowerTrigger superPowerCanBeUsed={superPowerCanBeUsed} startSuperPower={startUsingSuperPower} />
}

export default RogueSuperPower
