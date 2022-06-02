import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageRoutes, UserSidebarTitles } from '../../utils/constants';
import ActivityInfo from '../ActivityInfo/ActivityInfo';
import CombatTask from '../CombatTask/CombatTask';
import GameMap from '../GameMap/GameMap';
import Information from '../Information/Information';
import LoginAndRegistration from '../LoginAndRegistrationPage/LoginAndRegistration';
import NotFound from '../NotFoundPage/NotFound';
import Points from '../PointsPage/Points';
import QuestionAndOptions from '../QuestionAndOptions/QuestionAndOptions';
import QuestionSelectionDoor from '../QuestionSelectionDoor/QuestionSelectionDoor';
import MobileNavbar from '../Sidebar/MobileNavbar';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';
import { MobileNavCol, SidebarCol } from './AppGeneralStyles';
import SurveyTask from '../SurveyTask/SurveyTask';

function App() {
    return (
        <Container fluid className="p-0">
            <Row style={{ minHeight: '100vh', margin: 0 }}>
                <BrowserRouter>
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

                            <Route path={`${PageRoutes.COMBAT_TASK}`} element={<CombatTask />} />


                            <Route path={`${PageRoutes.POINTS}`} element={<Points />} />

                            <Route path={`${PageRoutes.SURVEY_TASK}`} element={<SurveyTask />} />
                            
                            <Route path={`${PageRoutes.INFORMATION}`} element={<Information />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Col>
                    <MobileNavCol xs={12}>
                        <MobileNavbar link_titles={Object.entries(UserSidebarTitles)} />
                    </MobileNavCol>
                </BrowserRouter>
            </Row>
        </Container>
    );
}

export default App;
