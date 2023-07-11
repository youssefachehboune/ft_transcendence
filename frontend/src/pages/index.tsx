import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import io from 'socket.io-client';

const MyForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<{
    username: string;
    message: string;
  }[]>([]);
  const [username, setUsername] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);

  var clientSide = true;
	const socket = io('http://localhost:3000', {
		transports: ['websocket'],
		withCredentials: true,
	});
	socket.on('receive_message', (data: string) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{ username: username, message: data },
		]);
		socket.emit('read_message', username)
	});
	socket.on('mark_read', () => {
		setStatus(true);
	})

	const compare = (a:any, b:any) => {
		if (a.length != b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (a[i].username !== b[i].username || a[i].message !== b[i].message) return false;
		}
		return true;
	}

  useEffect(() => {
    const fetchChat = async () => {
      clientSide = false;
      const oldmessages = await (
        await fetch('http://localhost:3000/chat', {
          credentials: 'include',
        })
      ).json();
      const oldchat = oldmessages.map((message: any) => ({
        username: message.sender_username,
        message: message.message
      }));
      setMessages((prevMessages) => compare(prevMessages, oldchat) ? oldchat : [...prevMessages, ...oldchat]);
    };
    if (clientSide) {
			if (username) socket.emit('read_message', username)
			fetchChat();
		}
    return () => {
      socket.disconnect();
    };
  }, [username]);

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
    const messageData = {
      username: username,
      message: inputValue
    };
    if (username) socket.emit('send_message', messageData);
		setStatus(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { username: '', message: inputValue },
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

  const recipientMessageContainerStyle: React.CSSProperties = {
    justifyContent: 'flex-start',
  };

  const senderMessageStyle: React.CSSProperties = {
    textAlign: 'right',
  };

  const isRecipient = (messageUsername: string) => {
    return messageUsername === username;
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={containerStyle}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={
              isRecipient(message.username)
                ? { ...messageContainerStyle, ...recipientMessageContainerStyle }
                : messageContainerStyle
            }
          >
            <p
              style={{
                ...messageStyle,
                ...(isRecipient(message.username) ? {} : senderMessageStyle),
              }}
            >
              {message.message}
            </p>
          </div>
        ))}
				<p >{`${status === true ? '-----read' : '-----unread'}`}</p>
        <div style={inputContainerStyle}>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
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
