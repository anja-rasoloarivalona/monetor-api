import { create, getMessages } from '../services/messagesService.js'

export default function messages(params){
    const { globalRoom, socket } = params;

    socket.on('send-message', async function(data){
        const newMessage = await create(data)
        if(newMessage){
            return globalRoom
                .to(data.toId)
                .emit('new-message', newMessage)
        }
    })

    socket.on('get-messages', async function(data){
        const { associationId, userId} = data
        const messages = await getMessages(associationId)
        if(messages){
            return globalRoom
                .to(userId)
                .emit('messages', messages)
        }
    })
}