import React from 'react';
import { Row } from 'react-bootstrap';
import { Content } from '../App/AppGeneralStyles';
import GroupsTable from './Table/GroupsTable';

export default function Groups() {
    return (
        <Content>
            <Row className="m-3">
                <h1>Groups</h1>
            </Row>
            <Row className="m-3">
                <GroupsTable />
            </Row>
        </Content>
    )
}