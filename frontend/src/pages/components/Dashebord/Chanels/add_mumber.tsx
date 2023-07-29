import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { BsPersonFillSlash } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";

function Add_mumber({memebers, ListFriends, isOpen, onClose}: any) {

    const isUserAlreadyMember = (user: any) => {
        return memebers && memebers.some((member: any) => member.username === user.username);
      };
    return ( 
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent background={'#41424D'} height={'400px'}>
                <ModalHeader color={'white'}>Add mumber</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflow={'hidden'}>
                        <div className="w-[100%] h-[270px] flex flex-col gap-1 rounded-[7px] overflow-y-auto">
                            {
                                ListFriends.map((user: any, index: number) => (
                                    !isUserAlreadyMember(user) && 
                                        <button  className={`w-[100%] flex items-center justify-center`}>
                                            <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                                    <img src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                            </div>
                                            <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                                                <h1 className={`text-[13px] font-sora font-[600] text-[white]`}>{user.firstName + " " + user.lastName}</h1>
                                                <h1 className={`text-[10px] font-sora font-[400] text-[white]`}>{"@" + user.username}</h1>
                                            </div>
                                            <button disabled={!isUserAlreadyMember(user)} className={`w-[111px] bg-[#14FF00] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                                                <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><HiUserAdd className='mr-[5px]'/>Invite</h1>
                                            </button>
                                        </button>

                                ))

                            }
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
     );
}

export default Add_mumber;