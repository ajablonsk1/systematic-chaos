import './App.css';
import {Container, Row, Col} from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from "../Sidebar/Sidebar";
import GameMap from "../GameMap/GameMap";
import NotFound from "../NotFoundPage/NotFound";
import {PageRoutes, UserSidebarTitles} from "../../utils/constants";


function App() {
  return (
    <Container>
        <Row>
            <Router>
                <Col xs={2}>
                    <Sidebar link_titles={Object.entries(UserSidebarTitles)}/>
                </Col>
                <Col xs={10} style={{ height: "80vh", width: "100vw" }}>
                    <Routes>
                        {/*TODO: new path routes in the future*/}
                        <Route path={PageRoutes.HOME} element={<GameMap/>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Col>
            </Router>
        </Row>
    </Container>
  );
}

export default App;
