import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PageRoutes, UserSidebarTitles } from '../../utils/constants';
import ActivityInfo from '../ActivityInfo/ActivityInfo';
import GameMap from '../GameMap/GameMap';
import NotFound from '../NotFoundPage/NotFound';
import QuestionAndOptions from '../QuestionAndOptions/QuestionAndOptions';
import QuestionSelectionDoor from '../QuestionSelectionDoor/QuestionSelectionDoor';
import MobileNavbar from '../Sidebar/MobileNavbar';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';

function App() {
    return (
        <Container fluid className="p-0">
            <Row style={{ minHeight: '100vh', margin: 0 }}>
                <Router>
                    <Col xs={2} className="d-md-block d-none p-0">
                        <Sidebar link_titles={Object.entries(UserSidebarTitles)} />
                    </Col>
                    <Col md={10} xs={12} className="p-0">
                        <Routes>
                            {/*//TODO: new path routes in the future*/}
                            <Route path={PageRoutes.GAME_MAP} element={<GameMap />} />

                            {/*//TODO: change it when mock data set will be ready*/}
                            <Route
                                path={`${PageRoutes.QUESTION_SELECTION}/:expeditionId/:parentId`}
                                element={<QuestionSelectionDoor />}
                            />

                            <Route
                                path={`${PageRoutes.QUESTION_ANSWER}/:expeditionId/:questionId`}
                                element={<QuestionAndOptions />}
                            />

                            <Route
                                path={`${PageRoutes.ACTIVITY_INFO}/:activityId`}
                                element={<ActivityInfo />}
                            />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Col>
                    <Col className="d-md-none d-block" xs={12}>
                        <MobileNavbar link_titles={Object.entries(UserSidebarTitles)} />
                    </Col>
                </Router>
            </Row>
        </Container>
    );
}

export default App;
