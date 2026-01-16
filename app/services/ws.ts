import { Server } from 'socket.io'
import type { Server as HttpServer } from 'http'

class Ws {
  public io!: Server

  public init(server: HttpServer) {
    this.io = new Server(server, {
      cors: { origin: '*' },
    })

    this.io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id)

      socket.on('joinTrip', (tripId: number) => {
        socket.join(`trip:${tripId}`)
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id)
      })
    })
  }
}

export default new Ws()
