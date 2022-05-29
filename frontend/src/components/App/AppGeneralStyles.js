import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { PageRoutes } from '../../utils/constants';

export const Content = styled.div`
    min-height: 100vh;
    padding: 0;
    width: 100%;
`;

export const SidebarCol = styled(Col)`
    display: none;
    padding: 0;

    @media (min-width: 768px) {
        display: ${window.location.pathname === PageRoutes.LOGIN_REGISTRATION ? 'none' : 'block'};
    }
`;

export const MobileNavCol = styled(Col)`
    display: none;
    padding: 0;

    @media (max-width: 767px) {
        display: ${window.location.pathname === PageRoutes.LOGIN_REGISTRATION ? 'none' : 'block'};
    }
`;
