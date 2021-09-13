import React, { useState } from 'react'
import './App.css';
import Login from '../Login/Login';
import useLocalStorage from '../../hooks/useLocalStorage';
import Dashboard from '../TheGame/Dashboard/Dashboard';
import { SocketProvider } from '../../contexts/SocketProvider';
import { AnswerProvider } from '../../contexts/AnswerProvider';
import { QuestionProvider } from '../../contexts/QuestionProvider';
import Instructions from '../Instructions/Instructions'


function App() {
  const [username, setUsername] = useLocalStorage('username');
  const [room, setRoom] = useState()
  const [Mode, setMode] = useState(false)

  const Gameboard = (
    <SocketProvider 
      room={room} 
      username={username} 
      Mode={Mode} setMode={setMode}
    >

      <QuestionProvider setMode={setMode}>
        <AnswerProvider>
          <Dashboard Mode={Mode} room={room} />
        </AnswerProvider>
      </QuestionProvider>

    </SocketProvider>

  )

  return (
    <div className="App">
      <header className="App-header">
        <img src="" id="opening_site_logo" alt="kahoodate logo" className="App-logo" />
      </header>

      {username && Mode ?
        Gameboard :
        <Login 
          username={username} 
          submitUsername={setUsername} 
          submitRoom={setRoom} 
          setMode={setMode} 
        />
      }

      <Instructions></Instructions>
    </div>
  );
}

export default App;