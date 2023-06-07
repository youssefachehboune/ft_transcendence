async function updateUser(data : any) {

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
				if (data.username)
				{
					data.first(false);
					data.second(true);
				}
			}
			} else {
				const result = await response.json();
				if (result.statusCode == 409)
				{
					if (data.username)
						data.hello(result.message)
				}
			}
		} catch (error) {
			console.log('Error fetching user:', error);
		}
    };
    await fetchuser();
}

export default updateUser;