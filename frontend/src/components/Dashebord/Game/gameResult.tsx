import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react";

import Image from "next/image";
export default function GameResult({onClose, isOpen, data, id}: {onClose: any, isOpen: any, data: any, id: number})
{
    let point;
    if(data && id)
      point = id === data.winner.userId ? 50 : 0;

  return (
        <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay/>
          <ModalContent shadow={'0px 0px 250px 1px rgba(0, 218, 234, 0.25)'} height={'300px'} background={"#090909"} borderRadius={'10px'} >
            <ModalHeader color={"white"} className="text-center font-sora font-[20px font-[600]"
            >Result</ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <div className="w-[100%] min-h-[181px] flex items-center justify-center">
                <div className="w-[80%] h-[90px] absolute  flex justify-between items-center">
                  <div className="w-[114px] h-[130px] flex flex-col items-center justify-between">
                    <Image width={'104'} height={'104'} src={data.winner.avatar} alt="" className="w-[104px] rounded-full border-solid border-[2px] border-[#00DAEA] bg-black"/>
                    <h1 className="text-white font-[400] font-sora text-[12px]">{data.winner.username}</h1>
                  </div>
                  <h1 className="font-sora text-[35px] font-[500] text-[#00DAEA] mb-[20px]">{data.winner.scoor + " : " +  data.loser.scoor}</h1>
                  <div className="w-[114px] h-[130px] flex flex-col items-center justify-between">
                    <Image width={'104'} height={'104'} src={data.loser.avatar} alt="" className="w-[104px] rounded-full border-solid border-[2px] border-[#00DAEA] bg-black"/>
                    <h1 className="text-white font-[400] font-sora text-[12px]">{data.loser.username}</h1>
                  </div>
                </div>
                <div className="w-[70%] h-[70px] mb-[20px] bg-[#312f2fb3]"></div>
              </div>
            </ModalBody>
            <ModalFooter>
                <h1 className="text-white text-center w-full font-sora font-[600] text-[20px]"
                > +{point} Points </h1>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}
