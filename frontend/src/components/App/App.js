import './App.css';
import {Container} from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from "../Sidebar/Sidebar";
import GameMap from "../GameMap/GameMap";
import NotFound from "../NotFoundPage/NotFound";
import {PageRoutes, UserSidebarTitles} from "../../utils/constants";
import QuestionSelectionDoor from "../QuestionSelectionDoor/QuestionSelectionDoor";
import {QuestionsList} from "../../storage/questions";


function App() {
  return (
    <Container fluid>
        <Router>
            <Sidebar link_titles={Object.entries(UserSidebarTitles)}/>

            <Routes>
                {/*TODO: new path routes in the future*/}
                <Route path={PageRoutes.HOME} element={<GameMap/>} />

                {/*TODO: change it when mock data set will be ready*/}
                <Route path={PageRoutes.QUESTION_SELECTION}
                       element={<QuestionSelectionDoor
                           questions={[QuestionsList[0], QuestionsList[1], QuestionsList[2]]} />}
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    </Container>
  );
}

export default App;
