import React from 'react';
import { getActivityMap } from '../../utils/Api';
import { ContentWithoutMargin } from '../App/AppGeneralStyles';
import Chapter from './Chapter';
import { Background } from './GameMapStyles';

function GameMap(props) {
    return (
        <ContentWithoutMargin>
            <Background>
                <Chapter activityMap={getActivityMap(0)}></Chapter>
            </Background>
        </ContentWithoutMargin>
    );
}

export default GameMap;
