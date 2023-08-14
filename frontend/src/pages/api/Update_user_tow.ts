async function Update_user_tow(data : any, dep: any, onCloseFn: () => void, setdata: (value: any) => void) {

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
				setdata((prevData: any) => ({
					...prevData,
					info: {
					  ...prevData.info,
					  bio: data.bio,
					  location: data.location,
					},
					avatar: data.avatar,
					username: data.username,
					firstName: data.firstName, 
					lastName: data.lastName
				  }));
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