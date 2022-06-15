import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

// todo: remove this component and use bootstrap spinner animation ?

const SpinnerContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    & > * {
        width: 80px;
        height: 80px;
        font-size: 1.3rem;
    }
`;

function Loader() {
    return (
        <SpinnerContainer>
            <Spinner animation="border" role="status">
                <span />
            </Spinner>
        </SpinnerContainer>
    );
}

export default Loader;
