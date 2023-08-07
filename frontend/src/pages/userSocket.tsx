import { io } from 'socket.io-client';

const user_socket = io('http://localhost:3000/status', {
	transports: ['websocket'],
	withCredentials: true,
});

export default user_socket;