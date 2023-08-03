import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonCircle, SkeletonText, useDisclosure } from "@chakra-ui/react";
import React from "react";

function Delete_chanel({setmychanel, setshowchanel, onClose, isOpen, chanel} : any) {
    const cancelRef = React.useRef(null)
    return ( 
        <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
    >
        <AlertDialogOverlay />

        <AlertDialogContent height={'200px'}>
                <AlertDialogHeader>Delete chanel</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Do you really want to delete this channel?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                    No
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={() =>
                    {
                        setshowchanel(false)
                        onClose()
                        setmychanel((prevMembers: any) => prevMembers.filter((channel: any) => channel.name !== chanel.name));
                        fetch('http://localhost:3000/channel/delete/' + chanel.name, {credentials: "include",method: 'PUT',})
                    }
                    }>
                    Yes
                    </Button>
                </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
     );
}

export default Delete_chanel;