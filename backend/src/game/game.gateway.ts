import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { GameService } from "./game.service";

@WebSocketGateway({ cors: { origin: '*' }, namespace: "game" })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    async handleConnection(socket: Socket) {
        console.log("connected one in game");
    }

    handleDisconnect(socket: Socket) {
        console.log("disconnected one in game");
    }
}