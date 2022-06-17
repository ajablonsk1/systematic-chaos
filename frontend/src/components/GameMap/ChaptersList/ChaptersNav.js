import React, {useEffect, useState} from 'react';
import { Tab } from 'react-bootstrap';
import { getChapters } from '../../../utils/Api';
import ChapterMap from '../Map/ChapterMap';
import { TabColored } from './ChaptersNavStyle';
import {getActivityMap} from '../../../storage/activityMap'
import Loader from "../../Loader/Loader";
import StudentService from "../../../services/student.service";


function ChaptersNav(props) {

    const [chapterMap, setChapterMap] = useState();
    const [tabs, setTabs] = useState([]);


    useEffect(() => {
        StudentService.getActivityMap(37).then(response => {console.log(response); setChapterMap(response);});
        // setChapterMap(getActivityMap(0));
    },[])

    useEffect(() => {
        if(chapterMap){
            setTabs(
                (tabs) => {
                    return(
                        [...tabs, React.cloneElement(
                            <Tab key={"Example map"} eventKey={"Example map"} title={"Example map"}>
                                <ChapterMap map={chapterMap}/>
                            </Tab>
                        )])
                }
            )
        }
    }, [chapterMap]);

    // useEffect(() => {
    //     console.log(tabs)
    // }, [tabs])


    // const chapters = getChapters() ? getChapters().chapters : []; // todo: endpoint needed
    //
    // const getFrontChapterID = () => {
    //     let frontChapter = chapters.find(chapter => isChapterUnlocked(chapter));
    //     return frontChapter ? frontChapter.id : null;
    // };
    //
    // const isChapterUnlocked = chapter => {
    //     // TODO: info from backend
    //     return true;
    // };

    // for (const chapter of chapters) {
    //     let map = getActivityMap(0); // TODO: getting proper activity map, endpoint needed
    //     tabs.push(
    //         <Tab
    //             key={chapter.id}
    //             eventKey={chapter.id}
    //
    //             disabled={!isChapterUnlocked(chapter)}
    //         >
    //             <ChapterMap map={map.activityMap} />
    //         </Tab>
    //     );
    // }






    return (
        <>
            {tabs.length === 0 ? (
                <Loader/>
            ) : (<TabColored
                defaultActiveKey={"Example map"}
                id="chaptersNav"
                className="mb-3 justify-content-center"
                unmountOnExit={true}
            >
                {tabs}
            </TabColored>)}
        </>

    );
}

export default ChaptersNav;
