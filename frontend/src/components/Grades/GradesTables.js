import moment from "moment";
import "moment/locale/pl";
import React from "react";
import {
    getGrades,
    getUnmarkedActivities,
    GRADES_TABLE_DATE_FROMAT,
} from "../../storage/gradesTable";
import {
    getActivityTypeName,
    GradesTableType,
    percentagesToGrade,
} from "../../utils/constants";
import { TableContainer } from "../PointsPage/Table/TableStyle";

// todo: general file refactor



// todo: think about refactor
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

const GradesTableHeaders = (tableType) => {
    return [
        "Nr",
        "Aktywność",
        ...(tableType === GradesTableType.GRADES_TABLE
            ? ["Ocena", "Punkty"]
            : ["Punkty do zdobycia"]),
        "Data",
        "Typ aktywności",
    ];
};

// todo: it looks like a component, so move to component file...
const GradesDefaultTable = (tableType) => {
    const headers = GradesTableHeaders(tableType);
    const tableContent = GradesData(tableType);

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

const GradesData = (tableType) => {
    switch (tableType) {
        case GradesTableType.GRADES_TABLE:
            return getGrades();
        case GradesTableType.UNMARKED_ACTIVITIES_TABLE:
            return getUnmarkedActivities();
        default:
            return [];
    }
};

export function GradesTable() {
    return GradesDefaultTable(GradesTableType.GRADES_TABLE);
}

export function UnmarkedActivitiesTable() {
    return GradesDefaultTable(GradesTableType.UNMARKED_ACTIVITIES_TABLE);
}
