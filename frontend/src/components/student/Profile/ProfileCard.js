import React from 'react'
import { CustomCard } from '../GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Button, Card } from 'react-bootstrap'

function ProfileCard(props) {
  return (
    <CustomCard>
      <CardHeader>
        <h5>{props.header}</h5>
      </CardHeader>
      <Card.Body className={'d-flex align-items-center justify-content-center flex-column'}>
        <>{props.body}</>
        {props.showButton && (
          <Button variant={props.customButton ?? 'warning'}>{props.buttonText ?? <span>Przejdź</span>}</Button>
        )}
      </Card.Body>
    </CustomCard>
  )
}

export default ProfileCard
