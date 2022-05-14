import React from 'react';
import { ContentWithoutMargin } from '../App/AppGeneralStyles';
import ChaptersNav from './ChaptersNav';
import { Background } from './GameMapStyles';

function GameMap(props) {
    return (
        <ContentWithoutMargin>
            <Background>
                <ChaptersNav></ChaptersNav>
            </Background>
        </ContentWithoutMargin>
    );
}

export default GameMap;
