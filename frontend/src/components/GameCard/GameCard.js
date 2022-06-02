import { Content } from '../App/AppGeneralStyles';
import { Row, Col, Card } from 'react-bootstrap';
import { GameCardButton } from './GameCardButton';
import { PageRoutes } from '../../utils/constants';

export default function GameCard() {
    return (
        <>
            <Content
                style={{
                    border: '1px solid pink',
                    backgroundcolor: 'black',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Col style={{ height: '100%' }}>
                    <Row
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'space-around',
                            padding: '20px',
                        }}
                    >
                        <Card
                            style={{
                                width: '35%',
                                backgroundColor: 'var(--dark-blue)',
                                color: 'var(--font-color)',
                            }}
                        >
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
                                route={`${PageRoutes.POINTS}`}
                            />
                        </Card>
                        <Card
                            style={{
                                width: '60%',
                                backgroundColor: 'var(--dark-blue)',
                                color: 'var(--font-color)',
                            }}
                        >
                            <Card.Body style={{ textAlign: 'center' }}>
                                <h1 style={{ fontWeight: 'bolder' }}>Ostatnie odznaki:</h1>
                            </Card.Body>
                            <GameCardButton text="Siemaneczko przejdźmy dalej" />
                        </Card>
                    </Row>
                </Col>
                <Col style={{ height: '100%' }}>
                    <Row
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'space-around',
                            padding: '20px',
                        }}
                    >
                        <Card
                            style={{
                                width: '35%',
                                backgroundColor: 'var(--dark-blue)',
                                color: 'var(--font-color)',
                            }}
                        >
                            <Card.Body style={{ textAlign: 'center' }}>
                                <h1 style={{ fontWeight: 'bolder' }}>Twoja ranga:</h1>
                            </Card.Body>
                            <GameCardButton text="Siemaneczko przejdźmy dalej" />
                        </Card>
                        <Card
                            style={{
                                width: '60%',
                                backgroundColor: 'var(--dark-blue)',
                                color: 'var(--font-color)',
                            }}
                        >
                            <Card.Body style={{ textAlign: 'center' }}>
                                <h1 style={{ fontWeight: 'bolder' }}>Ostatnio zdobyte punkty:</h1>
                            </Card.Body>
                            <GameCardButton text="Siemaneczko przejdźmy dalej" />
                        </Card>
                    </Row>
                </Col>
            </Content>
        </>
    );
}
