import { Content } from '../App/AppGeneralStyles';
import { Col, Row } from 'react-bootstrap';
import { FullDivider, SmallDivider } from '../ActivityInfo/ActivityInfoStyles';
//https://www.flaticon.com/free-icon/user-picture_21104
import userPicture from '../../utils/resources/user-picture.png';

export default function ActivityAssessmentDetails() {
    return (
        <Content>
            <Col style={{ paddingTop: '15px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        paddingTop: '10px',
                        paddingBottom: '5px',
                        backgroundColor: 'var(--dark-blue)',
                        color: 'var(--font-color)',
                    }}
                >
                    <h4>Zadanie bojowe - SuperSystem I</h4>
                </div>
                <Row
                    style={{
                        justifyContent: 'space-around',
                        paddingTop: '6px',
                        maxWidth: '1500px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        color: 'var(--font-color)',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'var(--dark-blue)',
                            width: '740px',
                            marginTop: '5px',
                            padding: '10px',
                        }}
                    >
                        <h4 style={{ textAlign: 'center' }}>Informacje o użytkowniku</h4>
                        <FullDivider />
                        <Row styles={{ justifyContent: 'center' }}>
                            <img src={userPicture} style={{ paddingLeft: '20px' }}></img>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexFlow: 'column',
                                    paddingLeft: '10px',
                                }}
                            >
                                <h5 styles={{ width: '100%' }}>Użytkownik testowy</h5>
                                <h5 styles={{ width: '100%' }}>zadanie oddane w terminie</h5>
                            </div>
                        </Row>
                    </div>
                    <div
                        style={{
                            backgroundColor: 'var(--dark-blue)',
                            width: '740px',
                            marginTop: '5px',
                            padding: '10px',
                        }}
                    >
                        <h4 style={{ textAlign: 'center' }}>Informacje o aktywności</h4>
                        <FullDivider />
                        <p style={{ marginBottom: '1px' }}>Treść:</p>
                        <p style={{ fontSize: '0.75rem', maxHeight: '120px', overflowY: 'auto' }}>
                            Narysuj przykład sieci składającej się z 3 routerów, 5 komputerów, 4
                            switchy wraz z wypisanym rodzajem użytych kabli na każdym połączeniu.
                        </p>
                        <p style={{ textAlign: 'center' }}>Punkty: 30</p>
                    </div>
                </Row>
                <Row
                    style={{
                        width: '100%',
                        minHeight: '300px',
                        maxHeight: '500px',
                        backgroundColor: 'var(--dark-blue)',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '10px',
                    }}
                >
                    <Col style={{ marginTop: '20px', color: 'var(--font-color)' }}>
                        <h4>Odpowiedź</h4>
                        <p style={{ fontSize: '1rem', maxHeight: '120px', overflowY: 'auto' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                            ullamcorper finibus magna, a pellentesque eros consequat id. Donec vitae
                            tristique purus, quis rutrum felis. Nam ultricies, risus at pharetra
                            fermentum, mi sem blandit lacus, eget vulputate est orci sit amet dui.
                            Aliquam est nunc, faucibus eget congue eu, lobortis non tortor. Interdum
                            et malesuada fames ac ante ipsum primis in faucibus. Aenean sodales
                            sollicitudin ex, id viverra tellus dictum non. Etiam consectetur magna
                            nec tortor sodales, ac dignissim eros aliquam. Integer sagittis mattis
                            sapien. Curabitur blandit imperdiet suscipit. Phasellus placerat libero
                            sed tristique pulvinar. Vivamus bibendum augue urna, accumsan interdum
                            risus venenatis quis.
                        </p>
                    </Col>
                </Row>

                <Col
                    style={{
                        width: '100%',
                        minHeight: '150px',
                        maxHeight: '300px',
                        backgroundColor: 'var(--dark-blue)',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '10px',
                        color: 'var(--font-color)',
                    }}
                >
                    <h4>Uwagi:</h4>
                    <textarea
                        styles={{
                            width: '800px',
                            padding: '3px',
                            border: 'none',
                            maxHeight: '220px',
                        }}
                    ></textarea>
                </Col>

                <Row
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-around',
                        backgroundColor: 'var(--dark-blue)',
                        width: '30%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '10px',
                        textAlign: 'center',
                        color: 'var(--font-color)',
                        padding: '10px',
                    }}
                >
                    <p style={{ top: '50%', position: 'relative', margin: '0' }}>Punkty: </p>
                    <Row style={{ display: 'flex' }}>
                        <input style={{ width: '50px' }} type="number" min={0} max={20}></input>
                        <p
                            style={{
                                top: '50%',
                                position: 'relative',
                                margin: '0',
                                marginLeft: '5px',
                            }}
                        >
                            {' '}
                            / 20
                        </p>
                    </Row>
                </Row>
            </Col>
        </Content>
    );
}
