import { Carousel } from 'react-bootstrap'

export const GameCardBadgeList = (props) => {
  return (
    <Carousel prevLabel='' nextLabel='' indicators={false}>
      {props.badges.map((badge) => {
        return (
          <Carousel.Item key={badge.name}>
            <img src={badge.photo} alt='badge pic'></img>
            <Carousel.Caption
              style={{
                position: 'relative',
                left: 'auto',
                right: 'auto',
                color: 'var(--font-color)'
              }}
            >
              <h3>{badge.name}</h3>
              <p>{badge.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}
