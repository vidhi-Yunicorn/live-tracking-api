
import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
})

socket.on('connect', () => {
  console.log('Connected:', socket.id)

  
  socket.emit('joinTrip', 2)  
})

socket.on('location_update', (data) => {
  console.log('Location update:', data)
})

socket.on('disconnect', () => {
  console.log('Disconnected')
})