import React from 'react';
import { ContentWithoutMargin } from '../App/AppGeneralStyles';
import ChaptersNav from './ChaptersNav';
import { Background } from './GameMapStyles';
import Legend from './Legend';

function GameMap(props) {
    return (
        <ContentWithoutMargin>
            <Background>
                <ChaptersNav></ChaptersNav>
                <Legend></Legend>
            </Background>
        </ContentWithoutMargin>
    );
}

export default GameMap;
