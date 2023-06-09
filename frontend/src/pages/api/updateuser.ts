async function updateUser(data : any, dep: any) {

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
				if (data.username && dep.tree && dep.for)
				{
					dep.first(false);
					dep.second(true);
				}
			}
			} else {
				const result = await response.json();
				if (result.statusCode == 400)
				{
					if (data.username)
						dep.error("this username is already in use")
				}
			}
		} catch (error) {
			console.log('Error fetching user:', error);
		}
    };
    await fetchuser();
}

export default updateUser;