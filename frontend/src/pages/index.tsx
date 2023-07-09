import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import io from 'socket.io-client';

const MyForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [username, setUsername] = useState<string>('');
	var clientSide = true;
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true
    });

		const fetchChat = async () => {
			clientSide = false;
			const oldmessages = await (await fetch('http://localhost:3000/chat', {
				credentials: 'include'
			})).json();
			const oldchat = oldmessages.map(( message:any ) => message.message);
			setMessages((prevMessages) => [...prevMessages, ...oldchat])
		}
		if (clientSide) fetchChat();
    socket.on('receive_message', (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendData();
    }
  };

  const sendData = () => {		
		const socket = io('http://localhost:3000', {
			transports: ['websocket'],
      withCredentials: true
    });
		const messageData = {
			username: username,
			message: inputValue,
		};
    socket.emit('send_message', messageData);
    setMessages((prevMessages) => [...prevMessages, inputValue]);
		socket.on('receive_message', (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    setInputValue('');
  };

	const containerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingTop: '20px',
	};
	

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    width: '300px',
    marginBottom: '10px',
    border: '1px solid #000',
  };

  const messageStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter username"
        style={inputStyle}
      />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter message"
        style={inputStyle}
      />
		{messages.slice(0).reverse().map((message, index) => (
			<p key={index} style={messageStyle}>
				{message}
			</p>
		))}
    </div>
  );
};

export default MyForm;
