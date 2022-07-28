import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any) {
    this.logger.log('initialized');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: any): void {
    //모두에게 보내고 싶을때
    this.wss.emit('msgToClient', text);
    // client.emit('msgToClient', text);
    // return { event: 'msgToClient', data: text }
  }
}
