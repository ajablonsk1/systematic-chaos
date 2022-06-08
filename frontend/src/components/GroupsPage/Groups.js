import React from 'react';
import { Row } from 'react-bootstrap';
import { Content } from '../App/AppGeneralStyles';
import { AddButton, Title } from './GroupsStyle';
import GroupsTable from './Table/GroupsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';


export default function Groups() {
    const navigate = useNavigate();

    const navigateToGroupAddition = () => {
        navigate(`${PageRoutes.GROUP_ADDITION}`);
    };

    return (
        <Content>
             <AddButton className="m-5" onClick={navigateToGroupAddition}>
                <FontAwesomeIcon icon={faPlus} size="2x" />
            </AddButton>
            <Row className="m-3">
                <Title>Grupy</Title>
            </Row>
            <Row className="m-3">
                <GroupsTable />
            </Row>    
        </Content>
    )
}