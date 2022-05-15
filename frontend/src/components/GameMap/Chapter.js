import React, { useRef } from 'react';
import { Border, MyContainer } from './ChapterStyles';
import { Row } from 'react-bootstrap';
import Activity from './Activity';

function getActivityFromMap(map, x, y) {
    return map.activities.find(activity => activity.posX === x && activity.posY === y) || null;
}

function Chapter(props) {
    const parentRef = useRef();
    const map = props.activityMap.activityMap;
    const activities = [];

    //had to rewrite this one to put margin bottom on the last one, can probably be done better
    console.log(map.mapSizeX);
    console.log(map.mapSizeY);
    for (let i = 0; i < map.mapSizeX - 1; i++) {
        const row = [];
        for (let j = 0; j < map.mapSizeY; j++) {
            row.push(
                <Activity
                    key={i * map.mapSizeX + j}
                    props={getActivityFromMap(map, i, j)}
                    parent={parentRef}
                    mapSizeX={map.mapSizeX}
                    mapSizeY={map.mapSizeY}
                ></Activity>
            );
        }
        activities.push(<Row key={i}>{row}</Row>);
    }

    const row = [];
    for (let i = 0; i < map.mapSizeY; i++) {
        row.push(
            <Activity
                key={(map.mapSizeX - 1) * map.mapSizeX + i}
                props={getActivityFromMap(map, map.mapSizeX - 1, i)}
                parent={parentRef}
                mapSizeX={map.mapSizeX}
                mapSizeY={map.mapSizeY}
            ></Activity>
        );
    }
    //if anyone knows how to do CSS magic with calc to get size of the sidebar, feel free to improve, it's good enough for now
    activities.push(
        <Row key={map.mapSizeY - 1} style={{ marginBottom: '50px' }}>
            {row}
        </Row>
    );

    console.log(activities);
    console.log(activities.length);

    return (
        <Border ref={parentRef}>
            <MyContainer fluid>{activities}</MyContainer>
        </Border>
    );
}

export default Chapter;
