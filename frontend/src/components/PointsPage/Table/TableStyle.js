import { Table } from 'react-bootstrap';
import styled from 'styled-components';

export const TableContainer = styled(Table)`
    background-color: var(--dark-blue);
    color: var(--font-color);
    text-align: center;

    & thead {
        font-size: larger;
    }

    & tbody tr:hover {
        background-color: var(--font-color);
        color: var(--dark-blue);
    }
`;
