async function Update_user_tow(data : any, dep: any, onCloseFn: () => void, setdataisloded: (value: boolean) => void) {

    const fetchuser = async () => {
      try {
		  const response = await fetch('http://localhost:3000/user/', {
			  credentials: "include",
			  method: 'PUT',
			  headers: {'Content-Type': 'application/json' },
			  body: JSON.stringify(data)
			});
			if(response.status == 200) {
			{
				onCloseFn()
				setdataisloded(false)
			}
			} else {
				const result = await response.json();
				if (result.statusCode == 400)
				{
					if (data.username)
						dep.error("username is already exist")
				}
			}
		} catch (error) {
			console.log('Error fetching user:', error);
		}
    };
    await fetchuser();
}

export default Update_user_tow;