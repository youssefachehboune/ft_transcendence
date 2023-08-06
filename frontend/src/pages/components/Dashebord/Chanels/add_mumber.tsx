import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { type } from "os";
import { useState } from "react";
import { BsPersonFillSlash } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import Image from "next/image";

function Add_mumber({invitationList, mutedList, banList, setListfriends, setinvitationList, memebers, ListFriends, isOpen, onClose, chanel}: any) {
    const isUserAlreadyMember = (user: any) => {
          return memebers && memebers.some((member: any) => member.username === user.username);
      };
    const isUserAlreadybaned = (user: any) => {
        return banList && banList.some((band: any) => band.username === user.username);
    };
    const isUserAlreadymuted = (user: any) => {
        return mutedList && mutedList.some((muted: any) => muted.username === user.username);
    };
    const isUserAlreadyinvited = (user: any) => {
        return invitationList && invitationList.some((invite: any) => invite.username === user.username);
    };
      const handleBanClick = (user: any) => {
        setinvitationList((prevBanList : any) => [...prevBanList, user])
        setListfriends((prevMembers: any) => prevMembers.filter((member: any) => member.username !== user.username));
        fetch(`http://localhost:3000/channel/Admin/${chanel.name}/${user.username}/invite`, {
          credentials: "include",
          method: 'PUT',
        })
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
                                ListFriends && ListFriends.map((user: any, index: number) => (
                                    !isUserAlreadyMember(user) && !isUserAlreadybaned(user) && !isUserAlreadymuted(user) && !isUserAlreadyinvited(user) && (
                                        <button key={index} className={`w-[100%] flex items-center justify-center`}>
                                            <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                                    <Image width={'54'} height={'54'} src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                            </div>
                                            <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                                                <h1 className={`text-[13px] font-sora font-[600] text-[white]`}>{user.firstName + " " + user.lastName}</h1>
                                                <h1 className={`text-[10px] font-sora font-[400] text-[white]`}>{"@" + user.username}</h1>
                                            </div>
                                            <button onClick={() => handleBanClick(user)} className={`w-[111px] cursor-pointer bg-[#14FF00] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                                                <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><HiUserAdd className='mr-[5px]'/>Invite</h1>
                                            </button>
                                        </button>
                                    )

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