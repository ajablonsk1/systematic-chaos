import React, { useRef, useState, useTransition } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { SmallDivider } from '../ActivityInfo/ActivityInfoStyles';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addFile, getCombatTask, removeFile } from '../../storage/combatTask';
import moment from 'moment';
import 'moment/locale/pl';
import { getBase64 } from './fileConverter';
import download from 'downloadjs';
import { setCompleted } from '../../storage/activityMap';

export default function FileService({ taskId, setFile, setFileName }) {
    const fileInput = useRef(null);
    const [fileChosen, setFileChosen] = useState(null);
    const loggedUserName = 'Jan Kowalski'; // TODO: delete
    const [task, setTask] = useState(getCombatTask(taskId)); // todo: endpoint or props
    const [isRemoving, startRemoving] = useTransition();
    const [isAdding, startAdding] = useTransition();

    const saveFile = () => {
        startAdding(() => {
            setFile(fileChosen.content)
            // addFile(task.id, fileChosen); // todo: endpoint
            setTask(getCombatTask(taskId));  //todo: remove and get from props or endpoint
            fileInput.current.value = '';
            setFileChosen(null);

            // if user has saved a file, activity is complete
            setCompleted(0, taskId); // todo: endpoint, post
        });
    };

    const remove = fileNumber => {
        startRemoving(() => {
            removeFile(taskId, fileNumber);  // todo: use endpoint
            setTask(getCombatTask(taskId));  // todo:props or endpoint once again
        });
    };

    const chooseFile = event => {
        const filename = event.target.value.split(/(\\|\/)/g).pop();
        setFileName(filename);

        const file = {
            date: moment(new Date()).calendar(),
            content: '',
            filename: filename,
            author: loggedUserName,
        };
        getBase64(event.target).then(data => {
            file.content = data;
        });
        setFileChosen(file);
    };

    const downloadFile = fileId => {
        const file = getCombatTask(taskId).files[fileId]; // todo: eh, really ?
        if (file.content) {
            download(file.content, file.filename);
        } else {
            alert('Ten plik wygląda na uszkodzony. Nie możesz go pobrać.');
        }
    };

    return (
        <>
            <strong>Załączone pliki:</strong>
            {task.files.length > 0 ? (
                task.files.map((file, idx) => (
                    <Row key={idx} className="mt-4">
                        <Col>{file.date}</Col>
                        <Col>{file.author}</Col>
                        <Col>{file.filename}</Col>
                        <Col>
                            <Button
                                variant="danger"
                                disabled={loggedUserName !== file.author}
                                onClick={() => remove(idx)}
                            >
                                {isRemoving ? <Spinner /> : <FontAwesomeIcon icon={faTrash} />}
                            </Button>
                            <Button
                                variant="warning"
                                className="ml-2"
                                onClick={() => downloadFile(idx)}
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </Button>
                        </Col>
                    </Row>
                ))
            ) : (
                <p>Brak dodanych plików</p>
            )}
            <SmallDivider />
            <strong>Dodaj pliki:</strong>
            <br />
            <input ref={fileInput} type="file" className="mb-5 mt-3" onChange={chooseFile} />
            <Button disabled={!fileChosen} onClick={() => saveFile()}>
                {isAdding ? <Spinner /> : <span>Dodaj</span>}
            </Button>
        </>
    );
}
