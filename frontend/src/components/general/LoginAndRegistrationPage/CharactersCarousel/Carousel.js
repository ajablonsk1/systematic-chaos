import React from 'react'
import { Col } from 'react-bootstrap'
import { CarouselItem, CustomCarousel } from './CarouselStyle'
import warrior from '../../../../utils/resources/heroes/warrior-big.png'
import wizard from '../../../../utils/resources/heroes/wizard-big.png'
import priest from '../../../../utils/resources/heroes/pope-big.png'
import rogue from '../../../../utils/resources/heroes/rogue-big.png'
import { connect } from 'react-redux'
// import gameMapExample from '../../../../storage/resources/game_example.png'

function Carousel(props) {
  const images = [warrior, wizard, priest, rogue] // TODO: use list of images

  const ItemsList = images.map((image, index) => (
    <CarouselItem key={index}>
      <img src={image} alt={'slide ' + index} height={'100%'} />
    </CarouselItem>
  ))

  return (
    <Col xs={6} className='p-0 d-none d-md-block'>
      <CustomCarousel $background={props.theme.primary} controls={false} autoPlay={true} interval={2500} pause={false}>
        {ItemsList}
      </CustomCarousel>
    </Col>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(Carousel)
