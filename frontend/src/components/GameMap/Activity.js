import React, { useEffect, useState } from 'react';
import { getActivityImg } from '../../utils/constants';
import { Square, ActivityImg } from './ActivityStyles';

function Activity(props) {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    useEffect(() => {
        const updateSize = () => {
            setWidth(props.parent.current.offsetWidth / props.mapSizeY * 0.90); // * 0.90 prevents wraping row
            setHeight(props.parent.current.offsetHeight / props.mapSizeX * 0.90);
        }

        if (props.parent.current) 
        {
            updateSize();
            window.addEventListener("resize", () => {
                updateSize();
            }, false);
        }
        
    }, [width, height, props])

    const isUnlocked = () => {
        // TODO
        return true;
    }

    const getContent = () => {
        if (props.props)
        {
            if (!isUnlocked())
            {
                return;
            }
            const activity = props.props;
            const type = activity.activityType;

            return <ActivityImg src={getActivityImg(type)}></ActivityImg>
        }
        return;
    }

    const startActivity = () => {
        // TODO
    }

    const getBackgroundColor = () => {
        if (props.props)
        {
            return 'white';
        }
        return 'transparent';
    }

    return (
        <Square 
            variant="outline-light" 
            style={{width: width + 'px', height: height + 'px', background: getBackgroundColor()}} 
            onClick={startActivity}
        >
            {getContent()}
        </Square>
    );
}

export default Activity;