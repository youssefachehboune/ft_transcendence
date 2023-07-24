import { FormControl, FormHelperText, FormLabel, Select } from "@chakra-ui/react";

function Typechanel({handleCountrySelect, Error}: any) {
    return ( 
        <FormControl mt={4}>
        <FormLabel>Channel Type</FormLabel>
        <Select borderStyle={Error ? 'solid' : ''} borderWidth={Error ? '2px' : ''} borderColor={Error ? 'red' : ''} onChange={handleCountrySelect}>
          <option value={''}>chose type of chanel</option>
          <option value="Private">Private</option>
          <option value="Public">Public</option>
          <option value="Protected">Protected</option>
        </Select>
        {Error ? 
              (
                <h1 className="text-[12px] text-[red]">{Error}</h1>
              ) : (
              <FormHelperText>
                      chose type of chanel
              </FormHelperText>
              )
        }
      </FormControl>
     );
}

export default Typechanel;