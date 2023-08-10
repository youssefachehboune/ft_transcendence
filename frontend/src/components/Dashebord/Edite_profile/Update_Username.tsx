import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
function Update_Username({data, username, setusername, Errorusername, setErrorusername}: any) {
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setErrorusername("")
        if (value.length > 15) {
            setusername(value.substring(0, 16));
            setErrorusername("error_user_max_charcter");
          } else {
            let containsNonAlphanumeric = false;
            for (let i = 0; i < value.length; i++) {
              const charCode = value.charCodeAt(i);
              if (
                !(charCode >= 48 && charCode <= 57) &&
                !(charCode >= 65 && charCode <= 90) &&
                !(charCode >= 97 && charCode <= 122)
              ) {
                containsNonAlphanumeric = true;
                break;
              }
            }
      
            if (containsNonAlphanumeric) {
              setusername(value);
              setErrorusername("error_user_alphanumeric");
            } else {
              setusername(value);
              setErrorusername('');
            }
          }
      };
    return ( 
        <FormControl>
        <FormLabel>Update Username</FormLabel>
        <Input borderStyle={Errorusername ? 'solid' : ''} borderWidth={Errorusername ? '2px' : ''} borderColor={Errorusername ? 'red' : ''} onChange={handleUsernameChange} value={username ? username : data.username} placeholder='Username' />
        {Errorusername && <p className="text-[red] text-[12px] font-sora">{Errorusername}</p>}
        </FormControl>
     );
}

export default Update_Username;