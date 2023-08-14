import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
function Update_firstName({data, firsName, setfirsName, ErrorfirsName, setErrorfirsName}: any) {
    const handlefirsNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setErrorfirsName("")
        if (value.length > 10) {
            setfirsName(value.substring(0, 11));
            setErrorfirsName("error_user_max_charcter");
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
              setfirsName(value);
              setErrorfirsName("error_user_alphanumeric");
            } else {
              setfirsName(value);
              setErrorfirsName('');
            }
          }
      };
    return ( 
        <FormControl mt={4}>
        <FormLabel>Update firsName</FormLabel>
        <Input borderStyle={ErrorfirsName ? 'solid' : ''} borderWidth={ErrorfirsName ? '2px' : ''} borderColor={ErrorfirsName ? 'red' : ''} onChange={handlefirsNameChange} value={firsName} placeholder='firsName' />
        {ErrorfirsName && <p className="text-[red] text-[12px] font-sora">{ErrorfirsName}</p>}
        </FormControl>
     );
}

export default Update_firstName;