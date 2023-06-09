import React, { useState, useEffect } from 'react';
async function getUser() {
	try {
	  const response = await fetch('http://localhost:3000/user', { credentials: "include" });
	  const res = await response.json();
	  return await res;
	} catch (error) {
	  console.log('Error fetching user:', error);
	  throw error;
	}
  }

  export default getUser;
  