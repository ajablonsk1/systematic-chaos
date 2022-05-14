import React from 'react';
import { Tabs} from 'react-bootstrap';
import Chapter from './Chapter';
import { getActivityMap, getChapters } from '../../utils/Api';
import { ChapterTab } from './ChaptersNavStyles';


function ChaptersNav(props) {
    const tabs = [];
    const chapters = getChapters() ? getChapters().chapters : [];

    const getFrontChapterID = () => {
        return chapters.length > 0 ? chapters[0].id : null;
    }

    for (const chapter of chapters)
    {
        let map = getActivityMap(0); // TODO: getting proper activity
        tabs.push(
            <ChapterTab key={chapter.id} eventKey={chapter.id} title={chapter.name} style={{height: "100vh"}}>
                <Chapter activityMap={map}></Chapter>
            </ChapterTab>
        )
    }

    return (
        <Tabs defaultActiveKey={getFrontChapterID()} id="uncontrolled-tab-example" className="mb-3"
        unmountOnExit={true}>
            {tabs}
        </Tabs>
    );
}

export default ChaptersNav;