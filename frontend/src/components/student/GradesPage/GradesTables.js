import "moment/locale/pl";
import {GradesTableType} from "../../../utils/constants";
import {GradesDefaultTable} from "./GradesDefaultTable";


export function GradesTable() {
    return GradesDefaultTable(GradesTableType.GRADES_TABLE);
}

export function UnmarkedActivitiesTable() {
    return GradesDefaultTable(GradesTableType.UNMARKED_ACTIVITIES_TABLE);
}
