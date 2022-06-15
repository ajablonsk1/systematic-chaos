import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PageRoutes, TeacherSidebarTitles, UserSidebarTitles } from '../../utils/constants';
import ActivityInfo from '../ActivityInfo/ActivityInfo';
import CanvasMap from '../CanvasMap/CanvasMap';
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
import { SidebarCol } from './AppGeneralStyles';
import SurveyTask from '../SurveyTask/SurveyTask';
import Groups from '../GroupsPage/Groups';
import GroupAddition from '../GroupAdditionPage/GroupAddition';
import GameCard from '../GameCard/GameCard';
import PageGuard from '../PageGuard/PageGuard';
import { Role } from '../../utils/userRole';
import { connect } from 'react-redux';
import AuthVerify from '../../common/auth-verify';
import { ToastContainer } from 'react-toastify';
import Grades from '../Grades/Grades';

import ActivityAssessmentList from '../ActivityAssessmentList/ActivityAssessmentList';
import ActivityAssessmentDetails from '../ActivityAssessmentDetails/ActivityAssessmentDetails';

import ExpeditionSummary from '../ExpeditionSummary/ExpeditionSummary';
import { isStudent } from '../../utils/storageManager';
import Timer from '../Timer/Timer';


function App(props) {
    const student = isStudent(props.user);
    return (
        <>
            <Container fluid className="p-0">
                <Row style={{ minHeight: '100vh', margin: 0 }}>
                    <BrowserRouter>
                        <SidebarCol
                            xs={2}
                            className={
                                window.location.pathname === PageRoutes.HOME
                                    ? 'd-none'
                                    : 'd-md-block d-none'
                            }
                        >
                            <Sidebar
                                link_titles={Object.entries(
                                    student ? UserSidebarTitles : TeacherSidebarTitles
                                )}
                            />
                        </SidebarCol>
                        <Col md={10} xs={12} className="p-0">
                            <Routes>
                                {/*//TODO: new path routes in the future*/}
                                <Route
                                    path={PageRoutes.GAME_MAP}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <GameMap />
                                        </PageGuard>
                                    }
                                />

                                {/*//TODO: change it when mock data set will be ready*/}
                                <Route
                                    path={`${PageRoutes.QUESTION_SELECTION}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <Timer>
                                                <QuestionSelectionDoor />
                                            </Timer>
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.EXPEDITION_SUMMARY}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <ExpeditionSummary />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.QUESTION_ANSWER}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <Timer>
                                                <QuestionAndOptions />
                                            </Timer>
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.ACTIVITY_INFO}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <ActivityInfo />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.HOME}`}
                                    element={
                                        <PageGuard role={Role.NOT_LOGGED_IN}>
                                            <LoginAndRegistration />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.COMBAT_TASK}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <CombatTask />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={PageRoutes.CANVAS}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <CanvasMap />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.POINTS}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <Points />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.SURVEY_TASK}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <SurveyTask />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.INFORMATION}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <Information />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.GROUPS}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <Groups />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.GROUP_ADDITION}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <GroupAddition />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.GAME_CARD}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <GameCard />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.GRADES}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
                                            <Grades />
                                        </PageGuard>
                                    }
                                />

                                {/* FOR TEST ONLY, DELETE LATER! */}
                                <Route
                                    path={`${PageRoutes.TEACHER_HOME}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IS_AS_TEACHER}>
                                            <CanvasMap /> {/* whatever, testing only */}
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.ACTIVITY_ASSESSMENT_LIST}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IS_AS_TEACHER}>
                                            <ActivityAssessmentList />
                                        </PageGuard>
                                    }
                                />

                                <Route
                                    path={`${PageRoutes.ACTIVITY_ASSESSMENT}`}
                                    element={
                                        <PageGuard role={Role.LOGGED_IS_AS_TEACHER}>
                                            <ActivityAssessmentDetails />
                                        </PageGuard>
                                    }
                                />

                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Col>
                        <SidebarCol
                            xs={12}
                            className={
                                window.location.pathname === PageRoutes.HOME
                                    ? 'd-none'
                                    : 'd-md-none d-block'
                            }
                        >
                            <MobileNavbar link_titles={Object.entries(UserSidebarTitles)} />
                        </SidebarCol>
                        <AuthVerify />
                    </BrowserRouter>
                </Row>
            </Container>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}
export default connect(mapStateToProps)(App);
