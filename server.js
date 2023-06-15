import { fileURLToPath, URL } from 'url'
import { join, dirname } from 'path'
import { Server } from "socket.io"
import express from 'express'
import http from 'http'
const app = express()
const server = http.createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url))


export function connect(conn, PORT) {
	app.get('/', (req, res) => {
  res.sendFile(__dirname + '/webpiew');
});
server.listen(PORT, () => {
  console.log('listening on *:3000');
});
}