import React, { useContext, useState, useEffect } from 'react'
import { useSocket } from './SocketProvider'

const QuestionContext = React.createContext()

export function useQuestion() {
    return useContext(QuestionContext)
}



export function QuestionProvider({ setMode, children }) {
    
    const [question, setQuestion] = useState('להתחלה לחצו על "לשאלה הבאה"')
    const [my_answer, setMyAnswer] = useState('')
    const [callbackFunc, setCallbackFunc] = useState()

    const socket = useSocket()
        
    
    const requestQuestion = () => {
        socket.emit('request-question')
    }

    useEffect(() => {
        if (socket == null) return
        
        socket.on('receive-question', (word) => {
            setMode('inGame')
            setQuestion(word)            
            callbackFunc(false)
            document.getElementById("word-card").scrollIntoView()
        })

        return () => socket.off('receive-question')
    }, [socket])


    const value = {
        question: question,
        my_answer: my_answer,
        setMyAnswer: setMyAnswer,
        requestQuestion: requestQuestion,
        setCallbackFunc: setCallbackFunc
    }

    return (
        <QuestionContext.Provider value={value}>
            {children}
        </QuestionContext.Provider>
    )
}