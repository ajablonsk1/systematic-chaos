import React, { useEffect, useMemo, useState } from 'react'
import { Console, ConsoleContent, Downloader } from './LogViewerStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import ProfessorService from '../../../../services/professor.service'
import Loader from '../../../general/Loader/Loader'
import download from 'downloadjs'

const logLineSplitRegex = /(?<=]) |(?<=:) /

function LogViewer() {
  const [logsFile, setLogsFile] = useState(undefined)

  useEffect(() => {
    ProfessorService.getLogsFile()
      .then((response) => {
        setLogsFile(response)
      })
      .catch(() => {
        setLogsFile(null)
      })
  }, [])

  const separatedDetailsFromFile = useMemo(() => {
    if (!logsFile) return

    return logsFile
      .split('\n')
      .map((line) => line.split(logLineSplitRegex))
      .map((separatedLine) => ({
        dateStamp: separatedLine[0],
        email: separatedLine[1],
        endpoint: separatedLine[2]
      }))
  }, [logsFile])

  const downloadFile = () => {
    if (logsFile) {
      download(logsFile, 'sc-logs.log')
    }
  }

  return (
    <Console>
      <Downloader>
        <FontAwesomeIcon
          icon={faDownload}
          size={'lg'}
          onClick={downloadFile}
          opacity={!!logsFile ? 1 : 0.6}
          style={{ cursor: !!logsFile ? 'pointer' : 'default' }}
        />
      </Downloader>
      <ConsoleContent className={'font-monospace text-white'}>
        {logsFile === undefined ? (
          <Loader />
        ) : logsFile == null ? (
          <p>$ empty logs list</p>
        ) : (
          separatedDetailsFromFile.map((logLine, index) => (
            <p key={index}>
              <span>{logLine.dateStamp}</span> <span>{logLine.email}</span> <span>{logLine.endpoint}</span>
            </p>
          ))
        )}
      </ConsoleContent>
    </Console>
  )
}

export default LogViewer
