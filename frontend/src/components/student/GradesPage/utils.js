import {getActivityTypeName, GradesTableType, percentagesToGrade} from "../../../utils/constants";
import moment from "moment";
import {getGrades, getUnmarkedActivities, GRADES_TABLE_DATE_FROMAT} from "../../../storage/gradesTable";

export const GradesTableContent = (tableType, row, idx) => {
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

export const GradesTableHeaders = (tableType) => {
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

export const GradesData = (tableType) => {
    switch (tableType) {
        case GradesTableType.GRADES_TABLE:
            return getGrades();
        case GradesTableType.UNMARKED_ACTIVITIES_TABLE:
            return getUnmarkedActivities();
        default:
            return [];
    }
};