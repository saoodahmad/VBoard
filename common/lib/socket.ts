import { io, Socket } from 'socket.io-client';

export const socket: Socket<Server2ClientEvents, Client2ServerEvents> = io();
