import React from "react";
import { Col, Row } from "react-bootstrap";
import {
    getAverageGrade,
    getGrades,
    getUnmarkedActivities,
    getWeightedAverageGrade,
} from "../../../storage/gradesTable";
import { FullDivider } from "../AllActivities/ExpeditionTask/ActivityInfo/ActivityInfoStyles";
import { Content } from "../../App/AppGeneralStyles";
import PercentageCircle from "../PointsPage/ChartAndStats/PercentageCircle";
import { GradesTable, UnmarkedActivitiesTable } from "./GradesTables";

export default function Grades() {
    return (
        <Content>
            <Row className="m-3">
                <Col>
                    <h1>Statystyki ocen</h1>
                    <FullDivider style={{ backgroundColor: "black" }} />
                    <p>
                        Średnia ocen: <strong>{getAverageGrade()}</strong>
                    </p>
                    <p>
                        Średnia ocen (ważona punktami):{" "}
                        <strong>{getWeightedAverageGrade()}</strong>
                    </p>
                    <p>
                        Liczba ocenionych aktywności:{" "}
                        <strong>{getGrades().length}</strong>
                    </p>
                    <p>
                        Liczba nieocenionych aktywności:{" "}
                        <strong>{getUnmarkedActivities().length}</strong>
                    </p>
                </Col>
                <Col>
                    <PercentageCircle
                        percentageValue={(100 * getAverageGrade()) / 5}
                        points={getAverageGrade()} // todo: move it to variable
                        maxPoints={5}
                    />
                </Col>
            </Row>
            <Row className="m-3">
                <h1>Nieocenione aktywności</h1>
            </Row>
            <Row className="m-3">
                <UnmarkedActivitiesTable />
            </Row>
            <Row className="m-3">
                <h1>Oceny</h1>
            </Row>
            <Row className="m-3">
                <GradesTable />
            </Row>
        </Content>
    );
}
