import React from 'react';
import { getGrades } from '../../storage/gradesTable';
import { getActivityTypeName, percentagesToGrade } from '../../utils/constants';
import { TableContainer } from '../PointsPage/Table/TableStyle';

export default function GradesTable() {
    const tableContent = getGrades();

    return (
        <TableContainer striped bordered hover>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Aktywność</th>
                    <th>Ocena</th>
                    <th>Punkty</th>
                    <th>Data</th>
                    <th>Typ aktywności</th>
                </tr>
            </thead>
            <tbody>
                {tableContent.map((row, idx) => (
                    <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{row.activityName}</td>
                        <td>{percentagesToGrade(row.points / row.maxPoints)}</td>
                        <td>{row.points}/{row.maxPoints}</td>
                        <td>{row.date}</td>
                        <td>{getActivityTypeName(row.activityType)}</td>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
}