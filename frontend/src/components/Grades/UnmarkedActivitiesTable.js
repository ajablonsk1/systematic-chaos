import React from 'react';
import { getUnmarkedActivities } from '../../storage/gradesTable';
import { getActivityTypeName } from '../../utils/constants';
import { TableContainer } from '../PointsPage/Table/TableStyle';

export default function UnmarkedActivitiesTable() {
    const tableContent = getUnmarkedActivities();

    return (
        <TableContainer striped bordered hover>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Aktywność</th>
                    <th>Punkty do zdobycia</th>
                    <th>Data</th>
                    <th>Typ aktywności</th>
                </tr>
            </thead>
            <tbody>
                {tableContent.map((row, idx) => (
                    <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{row.activityName}</td>
                        <td>{row.maxPoints}</td>
                        <td>{row.date}</td>
                        <td>{getActivityTypeName(row.activityType)}</td>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
}