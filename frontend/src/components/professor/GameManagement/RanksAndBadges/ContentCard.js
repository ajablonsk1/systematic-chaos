import React from 'react'
import { CustomCard } from '../../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { isMobileView } from '../../../../utils/mobileHelper'

function ContentCard(props) {
  return (
    <CustomCard
      $customHeight={isMobileView() ? 'auto' : '95vh'}
      $fontColor={props.theme.font}
      $background={props.theme.primary}
      $bodyColor={props.theme.secondary}
    >
      <CardHeader>
        <h5>{props.header}</h5>
      </CardHeader>
      <Card.Body className={`${isMobileView() ? 'auto' : 'h-75'}`} style={{ padding: isMobileView() ? 0 : 'auto' }}>
        {props.body}
      </Card.Body>
    </CustomCard>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ContentCard)
