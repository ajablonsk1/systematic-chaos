import React, { useEffect, useState } from 'react';
import { Square, ActivityImg } from './ActivityStyles';
import ExpeditionImg from './resources/expedition.png';
import InformationImg from './resources/information.png';
import SurveyImg from './resources/survey.png';
import TaskImg from './resources/task.png';


function Activity(props) {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);


    useEffect(() => {
        const updateSize = () => {
            setWidth(props.parent.current.offsetWidth / props.mapSizeY * 0.95); // * 0.95 prevents wraping row
            setHeight(props.parent.current.offsetHeight / props.mapSizeX * 0.95);
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

    const getImg = (type) => {
        switch(type) {
            case "expedition":
                return ExpeditionImg
            case "information":
                return InformationImg;
            case "survey":
                return SurveyImg;
            case "task":
                return TaskImg;
            default:
                return;
          }

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

            return <ActivityImg src={getImg(type)}></ActivityImg>
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