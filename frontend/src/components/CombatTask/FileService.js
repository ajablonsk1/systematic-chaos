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

export default function FileService({ taskId }) {
    const fileInput = useRef(null);
    const [fileChoosen, setFileChoosen] = useState(null);
    const loggedUserName = 'Jan Kowalski'; // delete later
    const [task, setTask] = useState(getCombatTask(taskId));
    const [isRemoving, startRemoving] = useTransition();
    const [isAdding, startAdding] = useTransition();

    const saveFile = () => {
        startAdding(() => {
            addFile(task.id, fileChoosen);
            setTask(getCombatTask(taskId));
            fileInput.current.value = '';
            setFileChoosen(null);
        });
    };

    const remove = fileNumber => {
        startRemoving(() => {
            removeFile(taskId, fileNumber);
            setTask(getCombatTask(taskId));
        });
    };

    const chooseFile = event => {
        const filename = event.target.value.split(/(\\|\/)/g).pop();
        const file = {
            date: moment(new Date()).calendar(),
            content: '',
            filename: filename,
            author: loggedUserName,
        };
        getBase64(event.target).then(data => {
            file.content = data;
        });
        setFileChoosen(file);
    };

    const downloadFile = fileId => {
        const file = getCombatTask(taskId).files[fileId];
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
            <Button disabled={!fileChoosen} onClick={() => saveFile()}>
                {isAdding ? <Spinner /> : <span>Dodaj</span>}
            </Button>
        </>
    );
}
