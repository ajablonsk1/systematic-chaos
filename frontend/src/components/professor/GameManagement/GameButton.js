import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

// TODO: refactor needed
function GameButton(props) {
  const navigate = useNavigate()
  const centerButton = !props.defaultPosition

  const buttonStyle = {
    width: `${props.customWidth ?? '100%'}`,
    textAlign: 'center',
    backgroundColor: `${props.theme.success}`,
    border: 'none',
    position: 'relative'
  }

  if (centerButton) {
    buttonStyle.left = '50%'
    buttonStyle.transform = 'translateX(-50%)'
  }

  return (
    <Card.Footer style={{ paddingTop: '10px' }}>
      <Button
        onClick={() => {
          if (props.callback) props.callback()
          if (props.route) navigate(props.route)
        }}
        style={buttonStyle}
      >
        {props.text}
      </Button>
    </Card.Footer>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(GameButton)
