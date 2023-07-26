async function Creat_channel(data : any, onCloseFn: () => void, setErrornamechanel: (value: any) => void) {

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
				onCloseFn()

		} catch (error) {
			console.log('Error fetching user:', error);
		}
    };
    await fetchuser();
}

export default Creat_channel;