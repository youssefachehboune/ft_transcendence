function updateUser(data : any) {

    const fetchuser = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/', {
			credentials: "include",
			method: 'PUT',
			headers: {'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
        const result = await response.json();
		if (result.statusCode == 409)
			window.alert(result.message)
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    fetchuser();
}

export default updateUser;