import moment from "moment";
import "moment/locale/pl";
import React from "react";
import {
    getGrades,
    getUnmarkedActivities,
    GRADES_TABLE_DATE_FROMAT,
} from "../../storage/gradesTable";
import { getActivityTypeName, percentagesToGrade } from "../../utils/constants";
import { TableContainer } from "../PointsPage/Table/TableStyle";

const GradesTableType = {
    GRADES_TABLE: 0,
    UNMARKED_ACTIVITIES_TABLE: 1,
};

const GradesTableContent = (tableType, row, idx) => {
    let tableContent = {
        id: idx + 1,
        name: row.activityName,
        ...(tableType === GradesTableType.GRADES_TABLE && {
            grade: percentagesToGrade(row.points / row.maxPoints),
        }),
        points:
            tableType === GradesTableType.GRADES_TABLE
                ? row.points + "/" + row.maxPoints
                : row.maxPoints,
        date: moment(row.date, GRADES_TABLE_DATE_FROMAT).fromNow(),
        activityType: getActivityTypeName(row.activityType),
    };
    return Object.entries(tableContent);
};

const GradesDefaultTable = (tableType, headers, tableContent) => {
    const content = tableContent.map((row, idx1) => {
        return (
            <tr key={idx1}>
                {GradesTableContent(tableType, row, idx1).map(
                    ([key, value], idx2) => {
                        return <td key={idx2}>{value}</td>;
                    }
                )}
            </tr>
        );
    });
    return (
        <TableContainer striped bordered hover>
            <thead>
                <tr>
                    {headers.map((header, idx) => {
                        return <td key={idx}>{header}</td>;
                    })}
                </tr>
            </thead>
            <tbody>{content}</tbody>
        </TableContainer>
    );
};

export function GradesTable() {
    const headers = [
        "Nr",
        "Aktywność",
        "Ocena",
        "Punkty",
        "Data",
        "Typ aktywności",
    ];
    const tableContent = getGrades();

    return GradesDefaultTable(
        GradesTableType.GRADES_TABLE,
        headers,
        tableContent
    );
}

export function UnmarkedActivitiesTable() {
    const headers = [
        "Nr",
        "Aktywność",
        "Punkty do zdobycia",
        "Data",
        "Typ aktywności",
    ];
    const tableContent = getUnmarkedActivities();

    return GradesDefaultTable(
        GradesTableType.UNMARKED_ACTIVITIES_TABLE,
        headers,
        tableContent
    );
}