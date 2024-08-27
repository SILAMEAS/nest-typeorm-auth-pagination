import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer ,OnGatewayConnection,OnGatewayDisconnect} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3002, {
  cors: {
    origin: '*', // Adjust this according to your needs
  },
})
export class SocketGateway implements OnGatewayConnection,OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    console.log('new user connected ...',client.id);
    client.emit('user-joined',{
      message:`User Joined the chat : ${client.id}`
    } as any)
  }
  handleDisconnect(client: Socket) {
    console.log('user disconnected ...',client.id);
    this.server.emit('user-left',{
      message:`User Left the chat : ${client.id}`
    } as any)
    client.to('roomName').emit('')
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() message: string) {
   this.server.emit('message',message as any); // Broadcast the message to all clients
  }
}
