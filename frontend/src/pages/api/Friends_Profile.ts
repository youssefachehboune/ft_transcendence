async function Friends_Profile(username : any) {
    try {
        const response = await fetch('http://localhost:3000/profile/' + username, { credentials: "include" });
        return await response.json();
      } catch (error) {
        console.log('Error fetching user:', error);
        throw error;
      }
}

export default Friends_Profile;