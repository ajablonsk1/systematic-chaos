import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// TODO: refactor needed
export const GameButton = (props) => {
  const navigate = useNavigate()
  const centerButton = !props.defaultPosition

  const buttonStyle = {
    width: `${props.customWidth ?? '100%'}`,
    textAlign: 'center',
    backgroundColor: '#085454',
    border: 'none'
  }

  if (centerButton) {
    buttonStyle.position = 'relative'
    buttonStyle.left = '50%'
    buttonStyle.transform = 'translateX(-50%)'
  }

  return (
    <Card.Footer style={{ paddingTop: '10px' }}>
      <Button
        onClick={() => {
          // TODO: it would be better to use a callback function
          if (props.route) navigate(props.route)
        }}
        style={buttonStyle}
      >
        {props.text}
      </Button>
    </Card.Footer>
  )
}
