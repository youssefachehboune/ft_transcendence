import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
	transports: ['websocket'],
	withCredentials: true,
});
const MyForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<{
    message: string;
  }[]>([]);
  const [channel, setChannel] = useState<string>('');

  var clientSide = true;
	socket.on('receive_channel_message', (data: string) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{ message: data },
		]);
	});

	const compare = (a:any, b:any) => {
		if (a.length != b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if ( a[i].message !== b[i].message) return false;
		}
		return true;
	}

  useEffect(() => {
    const fetchChat = async () => {
      clientSide = false;
      const oldmessages = await (
        await fetch('http://localhost:3000/chat/' + channel, {
          credentials: 'include',
        })
      ).json();
      const oldchat = oldmessages.map((message: any) => ({
        message: message.message
      }));
      setMessages((prevMessages) => compare(prevMessages, oldchat) ? oldchat : [...prevMessages, ...oldchat]);
    };
    if (clientSide) {
			fetchChat();
		}
  }, [channel]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChannel(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendData();
    }
  };

  const sendData = () => {
    socket.emit('send_channel_message', {channel: channel, message: inputValue});
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: inputValue },
    ]);
    setInputValue('');
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    marginBottom: '10px',
  };

  const usernameInputStyle: React.CSSProperties = {
    flex: '1',
    padding: '10px',
    marginRight: '5px',
    border: '1px solid #000',
  };

  const messageInputStyle: React.CSSProperties = {
    flex: '3',
    padding: '10px',
    border: '1px solid #000',
  };

  const messageStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const messageContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={containerStyle}>
			{messages.map((message, index) => (
			<div key={index} style={messageContainerStyle}>
				<p style={messageStyle}>{message.message}</p>
			</div>
				))}
        <div style={inputContainerStyle}>
          <input
            type="text"
            value={channel}
            onChange={handleUsernameChange}
            placeholder="Enter channel name"
            style={usernameInputStyle}
          />
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter message"
            style={messageInputStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default MyForm;
