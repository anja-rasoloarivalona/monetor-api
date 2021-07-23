import { Server } from 'socket.io'
import { verifyToken } from '../services/authService.js'
import messages from './messages.js'

const initSocket = server => {

    const allowedOrigin = process.env.ALLOWED_ORIGIN.split(',')

    const io = new Server(server, {
        cors: {
            origin: allowedOrigin,
            methods: ['GET', 'POST'],
            credentials: true
        },
        transports: ['polling', 'websocket']
    })

    const onlineUsers = {}

    const globalRoom = io.of('/').use(async (socket, next) => {
        const bearerToken = socket.request.headers.authorization
        const token = bearerToken.split(" ")[1]
        const decoded = await verifyToken(token, null)
        if(decoded){
            const userId = decoded.userId
            onlineUsers[userId] = {
                connected: false,
                contacts: {}
            }
            return next()
        }
        return socket.conn.close()
    })

    globalRoom.on("connection", socket => {

            socket.on("join", ({ userId, contacts }) => {
                socket.join(userId)
                onlineUsers[userId] = {
                    connected: true,
                    contacts,
                    socketId: socket.client.id
                }
                const connectedContacts = []
                contacts.forEach(contact => {
                    if(onlineUsers[contact] && onlineUsers[contact].connected){
                        connectedContacts.push(contact)
                    }
                })
                connectedContacts.forEach(contactId => {
                    globalRoom.to(contactId).emit("contact-joined", userId)
                })

                messages({
                    globalRoom,
                    socket
                })
                return globalRoom.to(userId).emit("joined", connectedContacts)
            })

            socket.on('disconnect', () => {
                const socketId = socket.client.id
                Object.keys(onlineUsers).forEach(userId => {
                    if(onlineUsers[userId].socketId === socketId){
                        onlineUsers[userId].connected = false
                        const disconnectedUser = onlineUsers[userId]
                        disconnectedUser.contacts.forEach(contactId => {
                            if(onlineUsers[contactId] && onlineUsers[contactId].connected){
                                globalRoom.to(contactId).emit("contact-left", userId)
                            }
                        })
                        return
                    }
                })
            })
        })
}

export {
    initSocket
}