import React from 'react';
import { getTableContent } from '../../../storage/pointsTable';
import { getActivityTypeName } from '../../../utils/constants';
import { TableContainer } from './TableStyle';

export default function PointsTable() {
    const tableContent = getTableContent();

    return (
        <TableContainer striped bordered hover>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Liczba punktów</th>
                    <th>Typ aktywności</th>
                    <th>Nazwa aktywności</th>
                </tr>
            </thead>
            <tbody>
                {tableContent.map((row, idx) => (
                    <tr key={idx}>
                        <td>{row.date}</td>
                        <td>{row.points}</td>
                        <td>{getActivityTypeName(row.activityType)}</td>
                        <td>{row.activityName}</td>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
}
