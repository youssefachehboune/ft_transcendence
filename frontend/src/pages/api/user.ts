import React, { useState, useEffect } from 'react';

function getUser(key : string) {
  const [user, setuser] = useState<string>('');

  useEffect(() => {
    const fetchuser = async () => {
      try {
		const url = 'http://localhost:3000/user/' + key;
        const response = await fetch(url, {credentials: "include"});
        const result = await response.json();
        setuser(result.msg);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchuser();
}, []);
return user;
}

export default getUser;