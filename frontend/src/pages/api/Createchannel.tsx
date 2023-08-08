async function Creat_channel(data : any, onCloseFn: () => void, setErrornamechanel: (value: any) => void, setmychanel: (value: any) => void, socket: any) {

    const fetchuser = async () => {
      try {
		  const response = await fetch('http://localhost:3000/channel/create/', {
			  credentials: "include",
			  method: 'POST',
			  headers: {'Content-Type': 'application/json' },
			  body: JSON.stringify(data)
			});
			const res = await response.json();
			if(res.error)
			{
				setErrornamechanel(res.error)
			}
			else
			{
				const newChannel = {
					avatar: data.avatar,
					name: data.name,
					description: data.description,
					password: data.password,
					type: data.typechanel,
				};
				socket.emit('add_channel', data.name);
				setmychanel((prevChannels: any) => [...prevChannels, newChannel]);
				onCloseFn()
			}
		} catch (error) {
			console.log('Error fetching user:', error);
		}
    };
    await fetchuser();
}

export default Creat_channel;