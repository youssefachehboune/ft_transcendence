import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

function Chanel_password({ setpassword, setError, Error }: any) {

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password) && password) {
      setError("Password must have at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
    } else {
      setError('');
    }
    setpassword(password);
  };

  return (
    <FormControl mt={4}>
      <FormLabel>Password</FormLabel>
      <Input onChange={handleUsernameChange} borderStyle={Error ? 'solid' : ''} borderWidth={Error ? '2px' : ''} borderColor={Error ? 'red' : ''} type="password" placeholder='Enter your password'/>
      {Error ? 
      (
        <h1 className="text-[12px] text-[red]">{Error}</h1>
      ) : (
      <FormHelperText>
                 Password must have at least 8 characters, including uppercase, lowercase, numbers, and special characters.
      </FormHelperText>
      )
    }
    </FormControl>
  );
}

export default Chanel_password;
