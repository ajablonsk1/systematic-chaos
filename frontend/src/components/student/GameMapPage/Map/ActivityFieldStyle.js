import styled from "styled-components";
import {Col} from "react-bootstrap";

export const ActivityCol = styled(Col)`
    border: 2px black solid;
    border-radius: 5px;
    width: auto;
    height: auto;
    margin: 1px;
    padding: 0;

    & img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    & div {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`;