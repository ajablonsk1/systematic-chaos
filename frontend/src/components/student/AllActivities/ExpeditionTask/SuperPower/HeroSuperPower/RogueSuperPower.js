import React, { useState, useEffect } from 'react'
import { EXPEDITION_STATUS } from '../../../../../../utils/constants'
import SuperPowerTrigger from '../SuperPowerTrigger'

function RogueSuperPower(props) {
  const [superPowerCanBeUsed, setSuperPowerCanBeUsed] = useState(undefined)
  const [superPowerInfo, setSuperPowerInfo] = useState(undefined)

  useEffect(() => {
    if (props.status === EXPEDITION_STATUS.ANSWER) {
      props
        .useCheck()
        .then((response) => {
          setSuperPowerCanBeUsed(response)
        })
        .catch(() => {
          setSuperPowerCanBeUsed(null)
        })
    } else {
      setSuperPowerCanBeUsed({ canBeUsed: false, message: 'Moc nie może być użyta w wyborze pytania.' })
    }
  }, [props, superPowerInfo])

  useEffect(() => {
    if (superPowerInfo?.value) {
      window.location.reload()
    }
  }, [props, superPowerInfo])

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
