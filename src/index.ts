import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const httpServer = app.listen(8280);

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function (ws) {
  ws.on("error",console.error); // Fixed the space issue in "error"

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});
// app.get('/',(req,res)=>{
//   res.send("helo")
// })