import { Row, Col, Card } from 'react-bootstrap';
import { GameCardButton } from './GameCardButton';
import { PageRoutes } from '../../utils/constants';
import { GameCardContent, GameCardOptionPick } from './GameCardStyles';
import { GameCardShortTable } from './GameCardShortTable';
import { Carousel } from 'react-bootstrap';
import badgeExample from '../../storage/resources/badges/new.png';

export default function GameCard() {
    return (
        //xl={5} xl={7}
        <>
            <GameCardContent>
                <Row style={{ marginBottom: '15px' }}>
                    <Col xl={5}>
                        <GameCardOptionPick>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <h1 style={{ fontWeight: 'bolder' }}>Miejsce w rankingu:</h1>
                                <h1 style={{ fontSize: '6rem' }}>#2</h1>
                                <h3
                                    style={{
                                        position: 'relative',
                                        textAlign: 'right',
                                        marginTop: 0,
                                        transform: 'translateY(-150%)',
                                        zIndex: 10,
                                    }}
                                >
                                    /180
                                </h3>

                                <h2>Gratulacje!</h2>
                                <h2>Jesteś w TOP 10%!</h2>
                            </Card.Body>
                            <GameCardButton
                                text="Sprawdź cały ranking"
                                route={`${PageRoutes.RANKING}`}
                            />
                        </GameCardOptionPick>
                    </Col>
                    <Col xl={7}>
                        <GameCardOptionPick>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <h1 style={{ fontWeight: 'bolder' }}>Ostatnie odznaki:</h1>
                                <Carousel prevLabel="" nextLabel="" indicators={false}>
                                    <Carousel.Item>
                                        <img src={badgeExample} alt="badge pic"></img>
                                        <Carousel.Caption
                                            style={{
                                                position: 'relative',
                                                left: 'auto',
                                                right: 'auto',
                                            }}
                                        >
                                            <h3>Nowa odznaka</h3>
                                            <p>Za przejście każdej aktywności</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={badgeExample} alt="badge pic"></img>
                                        <Carousel.Caption
                                            style={{
                                                position: 'relative',
                                                left: 'auto',
                                                right: 'auto',
                                            }}
                                        >
                                            <h3>Nowsza odznaka</h3>
                                            <p>Za zdobycie 100% punktów w zadaniu Dżungla kabli</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={badgeExample} alt="badge pic"></img>
                                        <Carousel.Caption
                                            style={{
                                                position: 'relative',
                                                left: 'auto',
                                                right: 'auto',
                                            }}
                                        >
                                            <h3>Najnowsza odznaka</h3>
                                            <p>Za zdobycie w sumie ponad 1000 punktów</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </Card.Body>
                            <GameCardButton
                                text="Sprawdź wszystkie zdobyte odznaki"
                                route={`${PageRoutes.BADGES_ACHIEVEMENTS}`}
                            />
                        </GameCardOptionPick>
                    </Col>
                </Row>

                <Row>
                    <Col xl={5}>
                        <GameCardOptionPick>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <h1 style={{ fontWeight: 'bolder' }}>Twoja ranga:</h1>
                            </Card.Body>
                            <GameCardButton
                                text="Sprawdź swoje punkty"
                                route={`${PageRoutes.POINTS}`}
                            />
                        </GameCardOptionPick>
                    </Col>
                    <Col xl={7}>
                        <GameCardOptionPick>
                            <Card.Body
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <div>
                                    <h1 style={{ fontWeight: 'bolder' }}>
                                        Ostatnio zdobyte punkty:
                                    </h1>
                                    <GameCardShortTable></GameCardShortTable>
                                </div>
                            </Card.Body>
                            <GameCardButton
                                text="Zobacz pełną listę"
                                route={`${PageRoutes.POINTS}`}
                            />
                        </GameCardOptionPick>
                    </Col>
                </Row>
            </GameCardContent>
        </>
    );
}
