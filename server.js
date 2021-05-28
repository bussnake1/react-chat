const io = require('socket.io')({
  cors: {
    origin: "*"
  }});

const messages = []
const userIds = []
const map = {}

io.on('connection', client => {
  client.emit('connected', {id: client.id}, function (res) {
    // acknowledged
    // mapping user ids to their socket ids
    map[res.id] = client.id
  })
  client.on('chat message', msg => {
    messages.push(msg)
    // console.log(messages)
    // console.log(map)
    io.emit('chat message', msg)
  })
  client.on('registeredUser', function (data) {
    if(userIds.find(data.id)) return
    userIds.push(data.id)
    // map user id to socket id
    map[data.id] = client.id
  })
  client.on('disconnect', () => {
    // remove from map
    Object.keys(map).forEach(key => {
      if (map[key] === client.id) {
        delete map[key]
        return
      }
    })
    console.log('client disconnected ', client.id)
  })
});
io.listen(8080)