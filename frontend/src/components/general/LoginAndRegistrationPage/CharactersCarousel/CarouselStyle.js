import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

export const CarouselItem = styled(Carousel.Item)`
    width: 100%;
    height: 100vh;

    & img {
        display: block;
        max-width: 80%;
        max-height: 80%;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const CustomCarousel = styled(Carousel)`
    & .carousel-indicators {
        margin-bottom: 20px;
    }

    & .carousel-indicators button {
        border-radius: 50%;
        background-color: white;
        outline: none;
        border: 1px solid black;
        width: 10px;
        height: 10px;
        padding: 5px;
        margin: 3px;

        &.active {
            background-color: var(--dark-blue);
        }
    }
`;
