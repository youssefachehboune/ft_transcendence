import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Update_avatar from "./Update_avatar";
import Select_contry from "./select_contry";
import Update_Bio from "./Update_Bio";
import Update_Username from "./Update_Username";

function Edite_profile({isOpen, onOpen, onClose, data}: any) {

    return ( 
        <div>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent height={'600px'}>
                    <ModalHeader>Edite your profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Update_avatar/>
                        <Update_Username data={data}/>
                        <Update_Bio data={data}/>
                        <Select_contry data={data}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                        Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>

        </div>
     );
}

export default Edite_profile;