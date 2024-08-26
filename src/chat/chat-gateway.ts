import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3002, {
  cors: {
    origin: '*', // Adjust this according to your needs
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() message: any): void {
    console.log(client);
    client.emit('reply', 'this is a new message');
    client.broadcast.emit('reply', 'broadcasting')
    this.server.emit('reply','broadcasting')
  }
}

/** socket.on()
  io.emit()
 socket.emit()
 * */