import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Chapter from './Chapter';
import { getActivityMap, getChapters } from '../../utils/Api';
import './ChaptersNav.css';


function ChaptersNav(props) {
    const tabs = [];
    const chapters = getChapters() ? getChapters().chapters : [];

    const getFrontChapterID = () => {
        let frontChapter = chapters.find(chapter => isChapterUnlocked(chapter));
        return frontChapter ? frontChapter.id : null;
    }

    const isChapterUnlocked = (chapter) => {
        // TODO
        return true;
    }

    for (const chapter of chapters)
    {
        let map = getActivityMap(0); // TODO: getting proper activity map
        tabs.push(
            <Tab 
                key={chapter.id} 
                eventKey={chapter.id} 
                title={chapter.name}
                disabled={!isChapterUnlocked(chapter)}
                style={{height: "100vh"}}
            >
                <Chapter activityMap={map}></Chapter>
            </Tab>
        )
    }

    return (
        <Tabs defaultActiveKey={getFrontChapterID()} 
            id="chaptersNav" 
            className="mb-3"
            unmountOnExit={true}
        >
            {tabs}
        </Tabs>
    );
}

export default ChaptersNav;