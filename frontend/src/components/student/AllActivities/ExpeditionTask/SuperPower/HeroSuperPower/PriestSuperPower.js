import React, { useEffect, useState } from 'react'
import SuperPowerTrigger from '../SuperPowerTrigger'

function PriestSuperPower(props) {
  const [superPowerCanBeUsed, setSuperPowerCanBeUsed] = useState(undefined)
  const [superPowerInfo, setSuperPowerInfo] = useState(undefined)

  useEffect(() => {
    props
      .useCheck()
      .then((response) => {
        setSuperPowerCanBeUsed(response)
      })
      .catch(() => {
        setSuperPowerCanBeUsed(null)
      })

    // eslint-disable-next-line
  }, [superPowerInfo])

  useEffect(() => {
    if (superPowerInfo?.value) {
      props.setRemainingTime(+superPowerInfo.value / 1000) // ms -> s
    }
    //eslint-disable-next-line
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

export default PriestSuperPower
