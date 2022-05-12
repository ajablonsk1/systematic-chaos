import React, { useRef } from 'react';
import { Border, MyContainer } from './ChapterStyles';
import { Row } from 'react-bootstrap';
import Activity from './Activity';


function getActivityFromMap(map, x, y)
{
    for (const activity of map.activities)
    {
        if (activity.posX === x && activity.posY === y) 
            return activity;
    }
    return null;
}

function Chapter(props) {
    const parentRef = useRef();

    const map = props.activityMap.activityMap;
    const activities = []
    
    for (let i=0; i<map.mapSizeX; i++)
    {
        const row = []
        for (let j=0; j<map.mapSizeY; j++)
        {
            row.push(
                <Activity 
                    key={i*map.mapSizeX + j} 
                    props={getActivityFromMap(map, i, j)}
                    parent={parentRef}
                    mapSizeX={map.mapSizeX}
                    mapSizeY={map.mapSizeY}

                >
                </Activity>)
        }
        activities.push(<Row key={i} >{row}</Row>);
    }
    
    return (
        <Border ref = { parentRef }>
            <MyContainer fluid>
                {activities}
            </MyContainer>
        </Border>
    );
}

export default Chapter;