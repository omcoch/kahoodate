import React, { useState } from 'react'
import './App.css';
import Login from '../Login/Login';
import useLocalStorage from '../../hooks/useLocalStorage';
import Dashboard from '../TheGame/Dashboard/Dashboard';
import { SocketProvider } from '../../contexts/SocketProvider';
import { AnswerProvider } from '../../contexts/AnswerProvider';
import { QuestionProvider } from '../../contexts/QuestionProvider';

function App() {
  const [username, setUsername] = useLocalStorage('username');
  const [room, setRoom] = useState()

  const Gameboard = (
    <SocketProvider room={room} setRoom={setRoom} username={username}>
      <QuestionProvider>
        <AnswerProvider>
          <Dashboard />
        </AnswerProvider>
      </QuestionProvider>
    </SocketProvider>
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src="" id="opening_site_logo" alt="kahoodate logo" className="App-logo" />
      </header>

      {username && room ?
        Gameboard :
        <Login username={username} submitUsername={setUsername} submitRoom={setRoom} />
      }

    </div>
  );
}

export default App;