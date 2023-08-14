import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import user_socket from "@/userSocket";
import { Players } from "./Game/gameData";

import Image from "next/image";
export default function Invite_game({onClose, isOpen, data}: {onClose: any, isOpen: any, data: Players | undefined})
{
    return (
        <>
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay/>
          <ModalContent height={'200px'} background={"black"} borderRadius={'10px'} >
            <ModalHeader color={"white"}>Invite To Game</ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <div className="w-[100%] min-h-[61px] flex gap-2">
                              <div className={`w-[80%] flex items-center justify-center rounded-l-[6px]`}>
                                <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                        <Image width={'54'} height={'54'} src={data?.sender.avatar ? data?.sender.avatar : ''} alt="" className="w-[54px] rounded-full select-none"/>
                                </div>
                                <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                                    <h1 className={`text-[13px] font-sora font-[600] text-[#ffffff]`}>{data?.sender.fullname}</h1>
                                    <h1 className={`text-[10px] font-sora font-[400] text-[#ffffff]`}>{"@" + data?.sender.username}</h1>
                                </div>
                              </div>

              </div>
            </ModalBody>
            <ModalFooter>
                <Button borderRadius={'full'} background={'#00DAEA'} fontFamily={'sora'} fontSize={'13px'} fontWeight={'400'} textColor={'black'} mr={'10px'} onClick={() => {user_socket.emit("accept", data); onClose()}}>accept</Button>
                <Button borderRadius={'full'} background={'#ea3300'} fontFamily={'sora'} fontSize={'13px'} fontWeight={'400'} textColor={'white'} onClick={onClose}>reject</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}
