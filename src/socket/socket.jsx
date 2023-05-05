import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL ='https://simpleapi-p29y.onrender.com/rooms';

export const socket = io(URL,{transports:['websocket'],auth:{
    email:""
}});