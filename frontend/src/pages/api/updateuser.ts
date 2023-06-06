function updateUser(data : any) {

    const fetchuser = async () => {
      try {
			console.log(data)
		  const response = await fetch('http://localhost:3000/user/', {
			  credentials: "include",
			  method: 'PUT',
			  headers: {'Content-Type': 'application/json' },
			  body: JSON.stringify(data)
			});
			if(response.status == 200) {
			{
				if (data.username)
					window.location.href = "/success_page";
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
    fetchuser();
}

export default updateUser;