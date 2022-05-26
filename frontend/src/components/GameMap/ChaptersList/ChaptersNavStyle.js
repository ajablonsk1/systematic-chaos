import { Tabs } from 'react-bootstrap';
import styled from 'styled-components';

export const TabColored = styled(Tabs)`
    & .nav-link.active {
        color: var(--font-color) !important;
        background-color: var(--dark-blue) !important;
        outline: 0 !important;
    }

    & .nav-link {
        margin: 1px;
        color: var(--font-color) !important;
        background-color: var(--button-green) !important;
        outline: 0 !important;
    }
`;
