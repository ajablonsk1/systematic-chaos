import React from 'react'
import { Button, Card } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import { CustomCard } from './GameCardStyles'
import { connect } from 'react-redux'

function GameCard(props) {
  return (
    <CustomCard
      $customHeight={'97%'}
      $fontColor={props.theme.font}
      $background={props.theme.primary}
      $bodyColor={props.theme.secondary}
    >
      <CardHeader>{props.headerText}</CardHeader>
      <Card.Body className={'h-75'}>
        {props.content}
        {props.onButtonClick ? (
          <Button
            className={'position-relative translate-middle-x start-50'}
            style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
            onClick={props.onButtonClick}
          >
            Przejdź
          </Button>
        ) : null}
      </Card.Body>
    </CustomCard>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(GameCard)
