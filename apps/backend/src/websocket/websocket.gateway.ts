import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  // Dipanggil saat ada pelanggan/mekanik yang online
  handleConnection(client: Socket) {
    console.log(`Client terhubung: ${client.id}`);
  }

  // Dipanggil saat mereka menutup aplikasi
  handleDisconnect(client: Socket) {
    console.log(`Client terputus: ${client.id}`);
  }

  // Fungsi untuk mengirim update status ke pelanggan tertentu
  sendStatusUpdate(vehicleId: string, status: string) {
    this.server.emit('statusUpdate', {
      vehicleId,
      status,
      timestamp: new Date().toISOString(),
    });
  }
}
