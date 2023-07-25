import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { error } from "console";
import { ChangeEvent, useState } from "react";

function   Chanel_name({setchanelname, chanelname, setError, Error}: any) {
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 10) {
            setchanelname(value.substring(0, 11));
            setError("Username can contain 10 characters maximum");
        } 
        else {
            let containsNonAlphanumeric = false;
            for (let i = 0; i < value.length; i++) {
              const charCode = value.charCodeAt(i);
              if (
                !(charCode >= 48 && charCode <= 57) && // 0-9
                !(charCode >= 65 && charCode <= 90) && // A-Z
                !(charCode >= 97 && charCode <= 122) // a-z
              ) {
                containsNonAlphanumeric = true;
                break;
              }
            }
      
            if (containsNonAlphanumeric) {
                setchanelname(value);
                setError("Username must only contain alphanumeric characters");
            } else {
                setchanelname(value);
                setError('');
            }
          }
      };
    return (
        <FormControl >
            <FormLabel>channel Name</FormLabel>
            <Input value={chanelname} onChange={handleUsernameChange} borderStyle={Error ? 'solid' : ''} borderWidth={Error ? '2px' : ''} borderColor={Error ? 'red' : ''}  placeholder='channel Name'/>
            {Error ? 
              (
                <h1 className="text-[12px] text-[red]">{Error}</h1>
              ) : (
              <FormHelperText>
                       Username must be 1-10 characters long and can only contain alphanumeric characters.
              </FormHelperText>
              )
            }
        </FormControl>   
    );
}

export default Chanel_name;