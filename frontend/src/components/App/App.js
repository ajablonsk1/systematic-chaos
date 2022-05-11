import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PageRoutes, UserSidebarTitles } from '../../utils/constants';
import ExpeditionInfo from '../ExpeditionInfo/ExpeditionInfo';
import GameMap from '../GameMap/GameMap';
import NotFound from '../NotFoundPage/NotFound';
import QuestionAndOptions from '../QuestionAndOptions/QuestionAndOptions';
import QuestionSelectionDoor from '../QuestionSelectionDoor/QuestionSelectionDoor';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';

function App() {
    return (
        <Container fluid>
            <Row>
                <Router>
                    <Col xs={2}>
                        <Sidebar link_titles={Object.entries(UserSidebarTitles)} />
                    </Col>
                    <Col xs={10} style={{ position: 'absolute' }}>
                        <Routes>
                            {/*//TODO: new path routes in the future*/}
                            <Route path={PageRoutes.HOME} element={<GameMap />} />

                            {/*//TODO: change it when mock data set will be ready*/}
                            <Route
                                path={PageRoutes.QUESTION_SELECTION}
                                element={<QuestionSelectionDoor />}
                            />

                            <Route
                                path={PageRoutes.QUESTION_ANSWER}
                                element={<QuestionAndOptions />}
                            />

                            <Route path={PageRoutes.EXPEDITION_INFO} element={<ExpeditionInfo />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Col>
                </Router>
            </Row>
        </Container>
    );
}

export default App;
