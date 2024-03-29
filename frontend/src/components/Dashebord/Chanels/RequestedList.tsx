import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import socket from '../../../chatSocket'

function RequestedList({setmemebers, setrequestList, chanel, requestList, onClose, isOpen}: any) {
  const handleBanClick = (action: string, user: any) => {
    if (action == 'accept') {
      socket.emit('add_user_to_channel', {channelName: chanel.name, username: user.username})
      setmemebers((prevBanList : any) => [...prevBanList, user]);
    }
    setrequestList((prevMembers: any) => prevMembers.filter((member: any) => member.username !== user.username));
    fetch(`http://localhost:3000/channel/Admin/${chanel.name}/${user.username}/${action}`, {
      credentials: "include",
      method: 'PUT',
    })
  };
    return ( 
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent background={'#41424D'} height={'400px'}>
                <ModalHeader borderBottomWidth='1px' color={'white'} className="font-sora font-500">Requested list</ModalHeader>
                <ModalCloseButton color={'white'}/>
                <ModalBody flexDir={'column'}>
                  <div className="w-[100%] h-[270px] test5 flex flex-col gap-1 rounded-[7px] overflow-y-auto">
                      {
                        requestList && Array.isArray(requestList) && requestList?.map((user: any, index: number) => (
                              <div key={index} className="w-[100%] min-h-[61px] flex gap-2">
                                  <div className={`w-[80%] flex items-center justify-center rounded-l-[6px]`}>
                                    <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                            <Image width={'54'} height={'54'} src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                    </div>
                                    <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                                        <h1 className={`text-[13px] font-sora font-[600] text-[#ffffff]`}>{user.firstName + " " + user.lastName}</h1>
                                        <h1 className={`text-[10px] font-sora font-[400] text-[#ffffff]`}>{"@" + user.username}</h1>
                                    </div>
                                  </div>
                                  <button onClick={() => handleBanClick("accept", user)} className={`w-[30px] bg-[#5ACDA4] h-[30px] self-center rounded-[4px] flex justify-center items-center`}>
                                          <BsCheckLg className='text-[12px] font-[400] font-sora flex items-center'/>
                                  </button>
                                  <button onClick={() => handleBanClick("reject", user)} className={`w-[30px] bg-[#cd3a3a] h-[30px] self-center rounded-[4px] flex justify-center items-center`}>
                                      <RxCross2 className='text-[12px] font-[400] font-sora flex items-center'/>
                                    
                                  </button>
    
                              </div>
    
                          )
                        )
                      }
                  </div>
                </ModalBody>
            </ModalContent>
          </Modal>
         );
}

export default RequestedList;