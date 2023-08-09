import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

function Channel_Description({setChannelDescription, ChannelDescription, setError, Error}: any) {

  const handleChannel_Description = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 200) {
		setChannelDescription(value.substring(0, 201));
		setError("Channel Description can contain 200 characters maximum");
	  } 
	  else {
		  setChannelDescription(value);
		  setError('');
	}
  };
    return ( 
        <FormControl mt={4}>
        <FormLabel>Channel Description</FormLabel>
        <Input onChange={handleChannel_Description} borderStyle={Error ? 'solid' : ''} borderWidth={Error ? '2px' : ''} borderColor={Error ? 'red' : ''} value={ChannelDescription} placeholder='Channel Description' />
        {Error ? 
              (
                <h1 className="text-[12px] text-[red]">{Error}</h1>
              ) : (
              <FormHelperText>
                       Channel Description can contain 200 characters maximum
              </FormHelperText>
              )
            }
      </FormControl>
     );
}

export default Channel_Description;