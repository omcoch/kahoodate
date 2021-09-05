// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = socketIO(server);
  
  
const io = require("socket.io")(process.env.PORT || 5000, {
    cors: {
        origin: ['http://localhost:3000', "https://admin.socket.io", "https://kahoodate.herokuapp.com"],
        credentials: true
    }
});







/** 
 *  users[id] = {
 *      room,
 *      username,
 *      lastEmoji,
 *  }
 * 

*/
var users = []
/**
 *  playground[room] = {
 *      wordsList,
 *      participants,
 *      next,
 *      
 *  }
 */
var playground = [] 


// todo: make sure this is async / wait etc...
function saveAnswer(userid, room, emoji) {
    users[userid].lastEmoji = emoji
    playground[room].participants.push(userid)
    return playground[room].participants.length == 2 // they both have been sent the answer
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

io.on('connection', (socket) => {
    const room = socket.handshake.query.room // current socket room
    const username = socket.handshake.query.username // current socket username
    
    
    
    socket.join(room)
    users[socket.id] = {
        room: room,
        username: username,
        lastEmoji: null
    }
    playground[room] = {
        wordsList: JSON.parse(JSON.stringify(require('./words.json'))), // fill the list with the words; implements deep clone to the json array
        participants: [],
        next: []
    }


    // request from the client for a new question
    //---------------------------------------------------
    socket.on('request-question', async (callback) => {
        // waiting to request from the two participants.
        if (!playground[room].next.includes(socket.id))
            playground[room].next.push(socket.id)

        if (playground[room].next.length == 2) {
            playground[room].next = [] 
            const rndWRd = await getRandomWord(room)
            io.to(room).emit('receive-question', rndWRd)
            callback()
        }
    }) 


    // answer from the client has been sent
    //---------------------------------------------------
    socket.on('send-answer', async (emoji) => {
        const itsOk = await saveAnswer(socket.id, room, emoji)
        if (itsOk) {
            playground[room].participants.map((p, index) => {
                playground[room].participants.filter((e, i) => i != index).map(partner => {
                    io.to(partner).emit('receive-answer', users[p].username, users[p].lastEmoji)
                })
            })
            playground[room].participants = [] // remove the data from the old question
        }
    })


    // if the partner disconnected so the game over and you sad about her, keep going with life
    socket.on('disconnect', () => {
        io.to(room).emit('exit-game')

    })

})
