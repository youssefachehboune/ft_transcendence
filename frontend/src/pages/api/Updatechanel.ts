async function Updatechanel(data : any, chanel: any, onCloseFn: () => void, setErrornamechanel: (value: any) => void) {

    const fetchuser = async () => {
      try {
		  const response = await fetch(`http://localhost:3000/channel/update/${chanel.name}`, {
			  credentials: "include",
			  method: 'PUT',
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

export default Updatechanel;