import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { SERVER_URL } from '../utils/globals'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}



export function SocketProvider({ room, username, setRoom, children }) {
    const [socket, setSocket] = useState()

    const userExists = (uid) => {
        socket.emit('user-exists', uid)
    }
        
    useEffect(() => {
        const newSocket = io(
            SERVER_URL,
            { 
                query: {room, username},
                //forceNew: true 
            }
        )
        console.log(room, username)
        setSocket(newSocket)

        return () => newSocket.close() // close old socket to avoid multiple connections and duplicate messages      
    }, [room])


    useEffect(() => {
        if (socket == null) return
        
        socket.on('exit-game', () => {
            setRoom(false)
            alert("השותף שלך יצא מהמשחק, נסו להתחבר שוב.")
        })

        return () => socket.off('exit-game') // close old socket to avoid multiple connections and duplicate messages      
    }, [socket])

    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
