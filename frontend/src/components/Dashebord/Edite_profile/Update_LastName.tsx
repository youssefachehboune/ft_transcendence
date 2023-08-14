import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
function Update_LastName({data, LatName, setLatName, ErrorLatName, setErrorLatName}: any) {
    const handleLatNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setErrorLatName("")
        if (value.length > 10) {
            setLatName(value.substring(0, 11));
            setErrorLatName("error_user_max_charcter");
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
              setLatName(value);
              setErrorLatName("error_user_alphanumeric");
            } else {
              setLatName(value);
              setErrorLatName('');
            }
          }
      };
    return ( 
        <FormControl mt={4}>
        <FormLabel>Update LatName</FormLabel>
        <Input borderStyle={ErrorLatName ? 'solid' : ''} borderWidth={ErrorLatName ? '2px' : ''} borderColor={ErrorLatName ? 'red' : ''} onChange={handleLatNameChange} value={LatName} placeholder='LatName' />
        {ErrorLatName && <p className="text-[red] text-[12px] font-sora">{ErrorLatName}</p>}
        </FormControl>
     );
}

export default Update_LastName;