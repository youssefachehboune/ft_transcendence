import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

function Update_Bio({data, Bio, setBio, ErrorBio, setErrorBio}: any) {
    const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 200) {
            setBio(value.substring(0, 201));
            setErrorBio("error_Bio_max_charcterc");
          } 
          else {
              setBio(value);
              setErrorBio('');
        }
      };
    return ( 
        <FormControl mt={4}>
        <FormLabel>Bio</FormLabel>
        <Input borderStyle={ErrorBio ? 'solid' : ''} borderWidth={ErrorBio ? '2px' : ''} borderColor={ErrorBio ? 'red' : ''} onChange={handleBioChange} value={Bio} placeholder='Bio'/>
        {ErrorBio && <p className="text-[red] text-[12px] font-sora">{ErrorBio}</p>}
        </FormControl>
     );
}

export default Update_Bio;