import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { SERVER_URL } from '../utils/globals'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}



export function SocketProvider({ room, username, Mode, setMode, children }) {
    const [socket, setSocket] = useState()


    const exitGame = (message) => {
        setMode(false)
        alert(message)
    }


    useEffect(() => {
        const newSocket = io(
            SERVER_URL,
            { 
                query: {room, username, Mode},
                //forceNew: true 
            }
        )
        setSocket(newSocket)

        if (Mode === 'newGame') setMode('firstWait')

        return () => newSocket.close() // close old socket to avoid multiple connections and duplicate messages      
    }, [room])


    useEffect(() => {
        if (socket == null) return
        


        socket.on('exit-game', (message) => {
            exitGame(message)
        })

        return () => socket.off('exit-game') // close old socket to avoid multiple connections and duplicate messages      
    }, [socket])

    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
