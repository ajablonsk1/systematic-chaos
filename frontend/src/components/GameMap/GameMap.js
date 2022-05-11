import React from 'react';
import { getActivityMap } from '../../utils/Api';
import Chapter from './Chapter';
import { Border } from './GameMapStyles';

function GameMap(props) {
    return (
        <Border>
             <Chapter activityMap={getActivityMap(0)}></Chapter>
        </Border>
    );
}

export default GameMap;
