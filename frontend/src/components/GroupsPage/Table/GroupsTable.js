import React from 'react';
import { getTableContent } from '../../../storage/groupsTable';
import { TableContainer } from '../../PointsPage/Table/TableStyle';

export default function GroupsTable() {
    const tableContent = getTableContent();

    return (
        // marginBottom prevents last records coverage by add button
        <TableContainer striped bordered hover style={{"marginBottom": "150px",}}>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Nazwa grupy</th>
                    <th>Kod</th>
                </tr>
            </thead>
            <tbody>
                {tableContent.map((row, idx) => (
                    <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{row.name}</td>
                        <td>{row.code}</td>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
}
