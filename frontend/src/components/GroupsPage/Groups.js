import React from 'react';
import { Row } from 'react-bootstrap';
import { Content } from '../App/AppGeneralStyles';
import { AddButton } from './GroupsStyle';
import GroupsTable from './Table/GroupsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export default function Groups() {
    return (
        <Content>
            <AddButton className="m-5">
                <FontAwesomeIcon icon={faPlus} size="2x" />
            </AddButton>
            <Row className="m-3">
                <h1>Grupy</h1>
            </Row>
            <Row className="m-3">
                <GroupsTable />
            </Row>    
        </Content>
    )
}