import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { BsPersonFillSlash } from "react-icons/bs";
import Image from "next/image";
import socket from "@/chatSocket";
function MutedList({setdatamumber, setmemebers, setmutedList, chanel, mutedList, isOpen, onClose}: any) {
    const handleBanClick = (user: any) => {
        socket.emit('add_channel', chanel.name);
        setdatamumber(user)
        setmemebers((prevBanList : any) => [...prevBanList, user])
        setmutedList((prevMembers: any) => prevMembers.filter((member: any) => member.username !== user.username));
        fetch(`http://localhost:3000/channel/Admin/${chanel.name}/${user.username}/unmute`, {
          credentials: "include",
          method: 'PUT',
        })
      };
    return ( 
            <>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent background={'#41424D'} height={'400px'}>
                    <ModalHeader color={'white'}>Muted List</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody overflow={'hidden'}>
                        <div className="w-[100%] h-[270px] test5 flex flex-col gap-1 rounded-[7px] overflow-y-auto">
                            {
                                mutedList && Array.isArray(mutedList) &&  mutedList?.map((user: any, index: number) => (
                                <div key={index} className="w-[100%] min-h-[61px] flex  gap-2">
                                    <div className={`w-[100%] flex items-center justify-center rounded-l-[6px]`}>
                                        <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                                <Image width={'54'} height={'54'} src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                        </div>
                                        <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                                            <h1 className={`text-[13px] font-sora font-[600] text-[#ffffff]`}>{user.firstName + " " + user.lastName}</h1>
                                            <h1 className={`text-[10px] font-sora font-[400] text-[#ffffff]`}>{"@" + user.username}</h1>
                                        </div>
                                    </div>
                                    <button onClick={() => handleBanClick(user)} className={`w-[111px] bg-[red] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                                        <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><BsPersonFillSlash className='mr-[5px]'/>unmute</h1>
                                    </button>
                                </div>
                                ))

                                }
                        </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
     );
}

export default MutedList;