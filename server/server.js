const io = require("socket.io")(process.env.PORT || 5000, {
    cors: {
        origin: ['http://localhost:3000', "https://admin.socket.io", "https://kahoodate.herokuapp.com"],
        credentials: true
    }
});







/**
 *  playground[room] = {
 *      wordsList,
 *      participants = [],
 *      nextQuestion = [],
 *      sendEmoji = []      
 *  }
 *  playground[room].participants[userid] = {
 *      username,
 *      lastEmoji
 *  }
 */
var playground = []


// todo: make sure this is async / wait etc...
function saveAnswer(userid, room, emoji) {
    if (!playground[room].sendEmoji.includes(userid))
        playground[room].sendEmoji.push(userid)
    playground[room].participants[userid].lastEmoji = emoji
    return playground[room].sendEmoji.length == 2 // they both have been sent the answer
}

//todo: הוא מדלג על המילה האחרונה תמיד
function getRandomWord(room) {
    const wordsList = playground[room].wordsList

    const rand_num = Math.floor(Math.random() * (wordsList.length))
    const theWord = wordsList[rand_num]
    wordsList.splice(rand_num, 1) // remove the chosen word from the original array
    if (wordsList.length == 0) // the last word just got out
        return "נגמרו לנו המילים צאו מהמסך כבר..."

    return theWord
}

function roomExists(room) {
    return playground[room] !== undefined
}


io.on('connection', (socket) => {
    const room = socket.handshake.query.room // current socket room
    const username = socket.handshake.query.username // current socket username
    const Mode = socket.handshake.query.Mode // current game mode

    // start a new game
    if (Mode === 'newGame') {
        if (roomExists(room)) {
            socket.emit('exit-game', "אירעה שגיאה נדירה. נסה לרענן ולהתחבר שוב למשחק.")
            return
        }

        playground[room] = {
            wordsList: JSON.parse(JSON.stringify(require('./words.json'))), // fill the list with the words; implements deep clone to the json array
            participants: [],
            sendEmoji: [],
            nextQuestion: []
        }
        playground[room].participants[socket.id] = {
            username: username,
            lastEmoji: null
        }

        socket.join(room)
    }

    // join to a waiting and existing user
    else if (Mode === 'joinGame') {
        // check if room actually exist
        if (!roomExists(room)) {
            socket.emit('exit-game', "קוד שגוי. נסו שוב.")
            return
        }

        // join the room
        playground[room].participants[socket.id] = {
            username: username,
            lastEmoji: null
        }

        socket.join(room)

        // trigger reciving question
    }




    // request from the client for a new question
    //---------------------------------------------------
    socket.on('request-question', async () => {
        // waiting to request from the two participants.
        if (!playground[room].nextQuestion.includes(socket.id))
            playground[room].nextQuestion.push(socket.id)

        if (playground[room].nextQuestion.length == 2) {
            playground[room].nextQuestion = []
            const rndWRd = await getRandomWord(room)
            io.to(room).emit('receive-question', rndWRd)
        }
    })


    // answer from the client has been sent
    //---------------------------------------------------
    socket.on('send-answer', async (emoji) => {
        const itsOk = await saveAnswer(socket.id, room, emoji)
        if (itsOk) {
            for (key in playground[room].participants) {
                for (key2 in playground[room].participants) {
                    if (key !== key2)
                        io.to(key).emit('receive-answer', playground[room].participants[key2].username, playground[room].participants[key2].lastEmoji)
                }
            }
            playground[room].sendEmoji = []
        }
    })



    // if the partner disconnected so the game over and you sad about her, keep going with life
    socket.on('disconnect', () => {
        io.to(room).emit('exit-game', "השותף שלך יצא מהמשחק, נסו להתחבר שוב.")
        // todo: deep remove of all the objects in this rooom elemnt
        playground.splice(room, 1)
    })

})
