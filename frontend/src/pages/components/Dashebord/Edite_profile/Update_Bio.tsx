import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function Update_Bio({data}: any) {
    return ( 
        <FormControl mt={4}>
        <FormLabel>Bio</FormLabel>
        <Input value={data.info.bio} placeholder='Bio' />
        </FormControl>
     );
}

export default Update_Bio;