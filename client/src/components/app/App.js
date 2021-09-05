import React, { useState } from 'react'
import './App.css';
import Login from '../Login/Login';
import useLocalStorage from '../../hooks/useLocalStorage';
import Dashboard from '../TheGame/Dashboard/Dashboard';
import { SocketProvider } from '../../contexts/SocketProvider';
import { AnswerProvider } from '../../contexts/AnswerProvider';
import { QuestionProvider } from '../../contexts/QuestionProvider';
import { v4 as uuidV4 } from 'uuid'

function App() {
  const [username, setUsername] = useLocalStorage('username');
  const [room, setRoom] = useState(uuidV4())

  const Gameboard = (

    <QuestionProvider>
      <AnswerProvider>
        <Dashboard />
      </AnswerProvider>
    </QuestionProvider>

  )

  return (
    <div className="App">
      <header className="App-header">
        <img src="" id="opening_site_logo" alt="kahoodate logo" className="App-logo" />
      </header>

      <SocketProvider room={room} setRoom={setRoom} username={username}>
        {username && room ?
          Gameboard :
          <Login username={username} submitUsername={setUsername} submitRoom={setRoom} />
        }
      </SocketProvider>

    </div>
  );
}

export default App;