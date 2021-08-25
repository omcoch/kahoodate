import React, { useContext, useState, useEffect } from 'react'
import { useQuestion } from './QuestionProvider';
import { useSocket } from './SocketProvider';

const AnswerContext = React.createContext()

export function useAnswer() {
    return useContext(AnswerContext)
}



export function AnswerProvider({ children }) {
    
    const [answerMode, setAnswerMode] = useState(false)
    const [emoji, setLastEmoji] = useState(false)
    const [username, setUsername] = useState(false)
    


    const socket = useSocket()
    const { setMyAnswer } = useQuestion()

    function sendAnswer(emoji) {
        socket.emit('send-answer', emoji)
        setMyAnswer(emoji)
        setAnswerMode(false)
    }

    useEffect(() => {
        if (socket == null) return
        
        socket.on('receive-answer', (name, emoji) => {
            setLastEmoji(emoji)
            setUsername(name)
            setAnswerMode(true)
        })

        return () => socket.off('receive-answer')
    }, [socket])

    const value = {
        answer: emoji,
        username: username,
        sendAnswer: sendAnswer,
        answerMode: answerMode
    }

    return (
        <AnswerContext.Provider value={value}>
            { children }
        </AnswerContext.Provider>
    )
}