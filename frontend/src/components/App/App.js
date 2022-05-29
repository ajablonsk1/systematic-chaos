import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PageRoutes, UserSidebarTitles } from '../../utils/constants';
import ActivityInfo from '../ActivityInfo/ActivityInfo';
import GameMap from '../GameMap/GameMap';
import LoginAndRegistration from '../LoginAndRegistrationPage/LoginAndRegistration';
import NotFound from '../NotFoundPage/NotFound';
import QuestionAndOptions from '../QuestionAndOptions/QuestionAndOptions';
import QuestionSelectionDoor from '../QuestionSelectionDoor/QuestionSelectionDoor';
import MobileNavbar from '../Sidebar/MobileNavbar';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';
import { MobileNavCol, SidebarCol } from './AppGeneralStyles';

function App() {
    return (
        <Container fluid className="p-0">
            <Row style={{ minHeight: '100vh', margin: 0 }}>
                <Router>
                    <SidebarCol xs={2}>
                        <Sidebar link_titles={Object.entries(UserSidebarTitles)} />
                    </SidebarCol>
                    <Col md={10} xs={12} className="p-0">
                        <Routes>
                            {/*//TODO: new path routes in the future*/}
                            <Route path={PageRoutes.GAME_MAP} element={<GameMap />} />

                            {/*//TODO: change it when mock data set will be ready*/}
                            <Route
                                path={`${PageRoutes.QUESTION_SELECTION}`}
                                element={<QuestionSelectionDoor />}
                            />

                            <Route
                                path={`${PageRoutes.QUESTION_ANSWER}`}
                                element={<QuestionAndOptions />}
                            />

                            <Route
                                path={`${PageRoutes.ACTIVITY_INFO}`}
                                element={<ActivityInfo />}
                            />

                            <Route
                                path={`${PageRoutes.LOGIN_REGISTRATION}`}
                                element={<LoginAndRegistration />}
                            />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Col>
                    <MobileNavCol xs={12}>
                        <MobileNavbar link_titles={Object.entries(UserSidebarTitles)} />
                    </MobileNavCol>
                </Router>
            </Row>
        </Container>
    );
}

export default App;
