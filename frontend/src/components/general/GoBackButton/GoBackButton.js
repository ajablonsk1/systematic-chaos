import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function GoBackButton(props) {
  const navigate = useNavigate()

  const buttonClass = props.customClass ?? 'position-relative translate-middle-x start-50 mt-4'

  const goBack = () => {
    navigate(props.goTo)
  }

  return (
    <Button
      className={buttonClass}
      style={{ backgroundColor: props.theme.warning, borderColor: props.theme.warning, width: 150 }}
      onClick={goBack}
    >
      Wyjdź
    </Button>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(GoBackButton)
