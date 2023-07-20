import { FormControl, FormLabel, Input } from "@chakra-ui/react";
function Update_Username({data}: any) {
    return ( 
        <FormControl>
        <FormLabel>Update Username</FormLabel>
        <Input value={data.username} placeholder='Username' />
        </FormControl>
     );
}

export default Update_Username;