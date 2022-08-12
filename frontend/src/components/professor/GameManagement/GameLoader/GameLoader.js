import React from 'react'
import { getConfigJson } from './mockData'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'

function GameLoader(props) {
  const jsonConfig = getConfigJson()

  return (
    <JSONEditor
      setShowModal={props.setShowModal}
      showModal={props.showModal}
      modalHeader={'Wczytaj konfigurację gry'}
      jsonConfig={jsonConfig}
      submitButtonText={'Zapisz konfigurację'}
      successModalHeader={'Wczytanie zakończone pomyślnie'}
      successModalBody={
        <p>Twój plik konfiguracyjny został wczytany pomyślnie, a baza danych wypełniona podanymi danymi.</p>
      }
    />
  )
}

export default GameLoader
