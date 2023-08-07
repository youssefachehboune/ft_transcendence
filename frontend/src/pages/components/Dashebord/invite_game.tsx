import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import user_socket from "@/pages/userSocket";

export default function Invite_game({onClose, isOpen, data}: {onClose: any, isOpen: any, data: any})
{
    return (
        <>
        <Modal  onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent height={'300px'} >
            <ModalHeader>Invite To Game</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p className="text-red">{data?.sender +  "wants to play with you"}</p>
            </ModalBody>
            <ModalFooter>
                <Button mr={'5px'} onClick={() => {user_socket.emit("accept", data); onClose()}}>accept</Button>
              <Button onClick={onClose}>reject</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}
