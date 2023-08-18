

module.exports = (io:any) => {
  io.on('connection', (socket:any) => {
    socket.on('joinNotifications', (params:any, cb:any) => {
      socket.join(params.sender)
      cb()
    })

    socket.on('sendNotifications', (request:any) => {
      io.to(request.reciever).emit('recieveNotifications', request)
    })
  })
}