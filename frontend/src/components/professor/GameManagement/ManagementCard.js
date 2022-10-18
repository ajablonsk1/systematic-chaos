import { GameCardOptionPick } from '../../general/GameCardStyles'
import GameButton from './GameButton'
import { connect } from 'react-redux'

function ManagementCard(props) {
  return (
    <GameCardOptionPick $background={props.theme.secondary} $fontColor={props.theme.font}>
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

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(ManagementCard)
