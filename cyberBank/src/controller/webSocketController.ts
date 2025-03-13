import WebSocket from 'ws';
import http from 'http';
import Const from '../strings';

import { getUserById, getProducts } from '../db/service';
import { deleteField, processProductsToResponse, 
    socketErrorMessage } from '../utils';


class WebSocketController {
    static wss: WebSocket.Server | null = null;
    
    static init(server: http.Server) : void {
        const wss = new WebSocket.Server({ server });

        wss.on('connection', (ws: WebSocket) => {
            console.log(Const.SOCKET_CONNECT);

            const interval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN)
                    ws.ping();
            }, 30000);

            ws.on('message', async (message: string) => {
                const user = await getUserById(JSON.parse(message).id);

                if (!user) {
                    ws.send(socketErrorMessage(Const.USER_NOT_FOUND));
                    return;
                }

                ws.send(JSON.stringify({
                    type: 'user',
                    message: deleteField(user, 'password'),
                }));

                const products = await getProducts();
                if (!products) {
                    ws.send(socketErrorMessage(Const.DB_REQUEST_ERROR));
                    return;
                }
                const processedProducts = await processProductsToResponse(products, user);
                if (!processedProducts) {
                    ws.send(socketErrorMessage(Const.DB_REQUEST_ERROR));
                    return;
                }

                ws.send(JSON.stringify({
                    type: 'products',
                    message: processedProducts,
                }));
            });

            ws.on('close', () => {
                clearInterval(interval);
                console.log(Const.SOCKET_DISCONNECT);
            });

            ws.on('ping', () => ws.pong());
        })

        WebSocketController.wss = wss;
        console.log(Const.SOCKET_SERVER_RUNNING);
    }

    static update() : void {
        if (!WebSocketController.wss) return;
        
        WebSocketController.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN)
                client.send(JSON.stringify({
                    type: 'update'
                }));
        });
    }
}

export default WebSocketController;