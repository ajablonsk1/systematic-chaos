import React from 'react';
import { Col } from 'react-bootstrap';
import { CarouselItem, CustomCarousel } from './CarouselStyle';
import hero1 from '../resources/hero1.png';
import hero2 from '../resources/hero2.png';
import hero3 from '../resources/hero3.png';
import hero4 from '../resources/hero4.png';
import hero5 from '../resources/hero5.png';

export default function Carousel() {
    return (
        <Col xs={6} className="p-0 d-none d-md-block">
            <CustomCarousel fade controls={false} autoPlay={true} interval={3000}>
                <CarouselItem>
                    <img src={hero1} alt="First slide" />
                </CarouselItem>
                <CarouselItem>
                    <img src={hero2} alt="second slide" />
                </CarouselItem>
                <CarouselItem>
                    <img src={hero3} alt="third slide" />
                </CarouselItem>
                <CarouselItem>
                    <img src={hero4} alt="fourth slide" />
                </CarouselItem>
                <CarouselItem>
                    <img src={hero5} alt="fifth slide" />
                </CarouselItem>
            </CustomCarousel>
        </Col>
    );
}
