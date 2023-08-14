import { FormControl, FormHelperText, FormLabel, Select } from "@chakra-ui/react";

function Typechanel({typechanel, handleCountrySelect, Error}: any) {
    return ( 
        <FormControl mt={4}>
        <FormLabel>Channel Type</FormLabel>
        <Select borderStyle={Error ? 'solid' : ''} borderWidth={Error ? '2px' : ''} borderColor={Error ? 'red' : ''} onChange={handleCountrySelect}>
          <option value={typechanel ? typechanel : ''}>{typechanel ? typechanel : "chose type of chanel"}</option>
          <option value="PRIVATE">Private</option>
          <option value="PUBLIC">Public</option>
          <option value="PROTECTED">Protected</option>
        </Select>
        {Error ? 
              (
                <h1 className="text-[12px] text-[red]">{Error}</h1>
              ) : (
              <FormHelperText>
                      choose type of chanel
              </FormHelperText>
              )
        }
      </FormControl>
     );
}

export default Typechanel;