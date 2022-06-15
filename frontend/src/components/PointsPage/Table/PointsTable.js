import React from 'react';
import { getTableContent } from '../../../storage/pointsTable';
import { getActivityTypeName } from '../../../utils/constants';
import { TableContainer } from './TableStyle';

export default function PointsTable() {
    const tableContent = getTableContent();

    return (
        <TableContainer className="mb-md-0 mb-5" striped bordered hover>
            <thead>
                {/*// todo: mapper maybe*/}
                <tr className="w-100">
                    <th className="w-25">Data</th>
                    <th className="w-25">Liczba punktów</th>
                    <th className="w-25">Typ aktywności</th>
                    <th className="w-25">Nazwa aktywności</th>
                </tr>
            </thead>
            <tbody>
                {tableContent.map((row, idx) => (
                    <tr className="w-100" key={idx}>
                        <td className="w-25">{row.date}</td>
                        <td className="w-25">{row.points}</td>
                        <td className="w-25">{getActivityTypeName(row.activityType)}</td>
                        <td className="w-25">{row.activityName}</td>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
}
