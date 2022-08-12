import { GameCardOptionPick } from '../../student/GameCardPage/GameCardStyles'
import { GameButton } from '../../student/GameCardPage/GameButton'

export default function ManagementCard(props) {
  return (
    <GameCardOptionPick>
      <h5 className={'pt-2'}>{props.header}</h5>
      <p className={'px-2'}>{props.description}</p>
      <GameButton
        text={'Przejdź'}
        customWidth={'auto'}
        defaultPosition
        route={props.routePath}
        callback={props.callback}
      />
    </GameCardOptionPick>
  )
}
