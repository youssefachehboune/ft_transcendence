import React, { useState, useEffect } from 'react';
async function getProfile() {
	try {
	  const response = await fetch('http://localhost:3000/profile', { credentials: "include" });
	  const res = await response.json();
	  return await res;
	} catch (error) {
	  console.log('Error fetching user:', error);
	  throw error;
	}
  }

  export default getProfile;
  