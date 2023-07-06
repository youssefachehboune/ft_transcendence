async function friends() {
    try {
        const response = await fetch('http://localhost:3000/friends', { credentials: "include" });
        return await response.json();
      } catch (error) {
        console.log('Error fetching user:', error);
        throw error;
      }
}

export default friends;