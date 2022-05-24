import React from 'react';
import { Row } from 'react-bootstrap';
import Loader from '../../Loader/Loader';
import { Map } from '../GameMapStyles';
import ActivityField from './ActivityField';

function getActivity(map, x, y) {
    return map.activities.find(activity => activity.posX === x && activity.posY === y) || null;
}

function createMap(map) {
    const rowsObj = [];
    for (let i = 0; i < map.mapSizeY; i++) {
        const cols = [];
        for (let j = 0; j < map.mapSizeX; j++) {
            cols.push(getActivity(map, j, i));
        }
        rowsObj.push(cols);
    }
    return rowsObj;
}

export default function ChapterMap({ map }) {
    const rows = createMap(map);

    return (
        <>
            {!rows ? (
                <Loader />
            ) : (
                <Map fluid className="h-100 my-5">
                    {rows.map((row, idx1) => (
                        <Row key={idx1} className="w-100 mx-auto">
                            {row.map((activity, idx2) => (
                                <ActivityField key={idx2} activity={activity} />
                            ))}
                        </Row>
                    ))}
                </Map>
            )}
        </>
    );
}
