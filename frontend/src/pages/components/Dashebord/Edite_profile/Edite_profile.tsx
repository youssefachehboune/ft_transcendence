import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Update_avatar from "./Update_avatar";
import Select_contry from "./select_contry";
import Update_Bio from "./Update_Bio";
import Update_Username from "./Update_Username";
import Update_user_tow from "@/pages/api/Update_user_tow";

function Edite_profile(props: any) {
    const onsave = async () =>
    {
        if (!props.ErrorBio && !props.Errorusername)
        {
            await Update_user_tow({ bio: props.Bio,  avatar: props.avatar, username: props.username, location: props.location}, {error: props.setErrorusername}, () => props.onClose(), props.setdataisloded);
        }
    }
    return ( 
        <div>
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <ModalOverlay />
            <ModalContent height={'700px'}  width={['60%','60%','100%', '100%',]}>
                    <ModalHeader>Edite your profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Update_avatar data={props.data} avatar={props.avatar} setavatar={props.setavatar}/>
                        <Update_Username data={props.data} username={props.username} setusername={props.setusername} Errorusername={props.Errorusername} setErrorusername={props.setErrorusername}/>
                        <Update_Bio data={props.data} Bio={props.Bio} setBio={props.setBio} ErrorBio={props.ErrorBio} setErrorBio={props.setErrorBio}/>
                        <Select_contry data={props.data} location={props.location} setlocation={props.setlocation}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onsave} colorScheme='blue' mr={3}>
                        Save
                        </Button>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>

        </div>
     );
}

export default Edite_profile;