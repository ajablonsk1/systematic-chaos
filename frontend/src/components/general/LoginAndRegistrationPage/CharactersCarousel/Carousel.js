import React from 'react'
import { Col } from 'react-bootstrap'
import { CarouselItem, CustomCarousel } from './CarouselStyle'
// import hero1 from '../resources/hero1.png';
// import hero2 from '../resources/hero2.png';
// import hero3 from '../resources/hero3.png';
// import hero4 from '../resources/hero4.png';
// import hero5 from '../resources/hero5.png';
import gameMapExample from '../../../../storage/resources/game_example.png'

export default function Carousel() {
  const images = [gameMapExample] // TODO: use list of images

  const ItemsList = images.map((image, index) => (
    <CarouselItem key={index}>
      <img src={image} alt={'slide ' + index} />
    </CarouselItem>
  ))

  return (
    <Col xs={6} className='p-0 d-none d-md-block'>
      <CustomCarousel fade controls={false} autoPlay={true} interval={3000}>
        {ItemsList}
      </CustomCarousel>
    </Col>
  )
}
