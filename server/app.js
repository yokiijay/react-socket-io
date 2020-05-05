const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)


// DB
const db = []

io.on('connection', socket =>{
  console.log( 'user connected' )
  io.emit('message', db)

  socket.on('message', val=>{
    db.push(val)
    console.log( `added '${val}' to DB` )

    io.emit('message', db)
  })

  socket.on('disconnect', (reason)=>console.log( 'socket disconnected', reason ))
})

// start server
server.listen(5000, ()=>console.log( `server running at 5000` ))
