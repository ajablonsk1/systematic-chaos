import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PageRoutes, TeacherSidebarTitles, UserSidebarTitles } from '../../utils/constants';
import ActivityInfo from '../student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfo';
import CanvasMap from '../student/CanvasMapPage/CanvasMap';
import CombatTask from '../student/AllActivities/CombatTask/CombatTask';
import GameMap from '../student/GameMapPage/GameMap';
import Information from '../student/AllActivities/InfoTask/Information';
import LoginAndRegistration from '../general/LoginAndRegistrationPage/LoginAndRegistration';
import NotFound from '../general/NotFoundPage/NotFound';
import Points from '../student/PointsPage/Points';
import QuestionAndOptions from '../student/AllActivities/ExpeditionTask/QuestionAndOptions/QuestionAndOptions';
import QuestionSelectionDoor from '../student/AllActivities/ExpeditionTask/QuestionSelectionDoor/QuestionSelectionDoor';
import MobileNavbar from '../general/Sidebar/MobileNavbar';
import Sidebar from '../general/Sidebar/Sidebar';
import './App.css';
import { SidebarCol } from './AppGeneralStyles';
import SurveyTask from '../student/AllActivities/SurveyTask/SurveyTask';
import Groups from '../professor/GroupsPage/Groups';
import GroupAddition from '../professor/GroupAdditionPage/GroupAddition';
import GameCard from '../student/GameCardPage/GameCard';
import PageGuard from '../general/PageGuard/PageGuard';
import { Role } from '../../utils/userRole';
import { connect } from 'react-redux';
import AuthVerify from '../../common/auth-verify';
import { ToastContainer } from 'react-toastify';
import Grades from '../student/GradesPage/Grades';

import ActivityAssessmentList from '../professor/ActivityAssessmentList/ActivityAssessmentList';
import ActivityAssessmentDetails from '../professor/ActivityAssessmentDetails/ActivityAssessmentDetails';

import ExpeditionSummary from '../student/AllActivities/ExpeditionTask/ExpeditionSummary/ExpeditionSummary';
import { isStudent } from '../../utils/storageManager';
import Timer from '../student/AllActivities/ExpeditionTask/Timer/Timer';


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
