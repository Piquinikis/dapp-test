"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
var PORT = parseInt(process.env.PORT, 10);
var app = express();
exports.app = app;
app.use(express.json());
app.set("port", PORT);
var server = http_1.createServer(app);
var io = socketIo(server);
io.on('connect', function (socket) {
    console.log('Connected client on port %s.', PORT);
    socket.on('message', function (m) {
        console.log('[server](message): %s', JSON.stringify(m));
        io.emit('message', m);
    });
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});
