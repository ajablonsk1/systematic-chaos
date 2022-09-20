import React from 'react'
import { Col } from 'react-bootstrap'
import { CarouselItem, CustomCarousel } from './CarouselStyle'
import warrior from '../../../../storage/resources/warrior-big.png'
import wizard from '../../../../storage/resources/wizard-big.png'
import priest from '../../../../storage/resources/pope-big.png'
import rogue from '../../../../storage/resources/rogue-big.png'
// import gameMapExample from '../../../../storage/resources/game_example.png'

export default function Carousel() {
  const images = [warrior, wizard, priest, rogue] // TODO: use list of images

  const ItemsList = images.map((image, index) => (
    <CarouselItem key={index}>
      <img src={image} alt={'slide ' + index} height={'100%'} />
    </CarouselItem>
  ))

  return (
    <Col xs={6} className='p-0 d-none d-md-block'>
      <CustomCarousel controls={false} autoPlay={true} interval={2500} pause={false}>
        {ItemsList}
      </CustomCarousel>
    </Col>
  )
}
