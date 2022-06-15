import React from 'react';
import { Tab } from 'react-bootstrap';
import { getChapters } from '../../../utils/Api';
import ChapterMap from '../Map/ChapterMap';
import { TabColored } from './ChaptersNavStyle';
import {getActivityMap} from '../../../storage/activityMap'

function ChaptersNav(props) {
    const tabs = [];
    const chapters = getChapters() ? getChapters().chapters : []; // todo: endpoint needed

    const getFrontChapterID = () => {
        let frontChapter = chapters.find(chapter => isChapterUnlocked(chapter));
        return frontChapter ? frontChapter.id : null;
    };

    const isChapterUnlocked = chapter => {
        // TODO: info from backend
        return true;
    };

    for (const chapter of chapters) {
        let map = getActivityMap(0); // TODO: getting proper activity map, endpoint needed
        tabs.push(
            <Tab
                key={chapter.id}
                eventKey={chapter.id}
                title={chapter.name}
                disabled={!isChapterUnlocked(chapter)}
            >
                <ChapterMap map={map.activityMap} />
            </Tab>
        );
    }

    return (
        <TabColored
            defaultActiveKey={getFrontChapterID()}
            id="chaptersNav"
            className="mb-3 justify-content-center"
            unmountOnExit={true}
        >
            {tabs}
        </TabColored>
    );
}

export default ChaptersNav;
