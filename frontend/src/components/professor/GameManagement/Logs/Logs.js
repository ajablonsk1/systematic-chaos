import React from 'react'
import LogViewer from './LogViewer'
import GoBackButton from '../../../general/GoBackButton/GoBackButton'
import { TeacherRoutes } from '../../../../routes/PageRoutes'

function Logs() {
  return (
    <div>
      <h2 className={'text-center'}>Lista logów serwera</h2>
      <LogViewer />
      <GoBackButton goTo={TeacherRoutes.GAME_MANAGEMENT.MAIN} />
    </div>
  )
}

export default Logs
