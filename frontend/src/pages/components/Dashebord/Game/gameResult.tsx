import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react";

import Image from "next/image";
export default function GameResult({onClose, isOpen, data, id}: {onClose: any, isOpen: any, data: any, id: number})
{
    // console.log("winner :", data.winner.username, data.winner.avatar, data.winner.scoor);
    // console.log("loser :", data.loser.username, data.loser.avatar, data.loser.scoor);
    let point;
    if(data && id)
      point = id === data.winner.userId ? 50 : 0;

  return (
        <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay/>
          <ModalContent height={'300px'} background={"black"} borderRadius={'10px'} >
            <ModalHeader color={"white"} className="text-center "
            >Result</ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <div className="w-[100%] min-h-[61px] flex gap-2">
                    <h1></h1>
              </div>
            </ModalBody>
            <ModalFooter>
                <h1 className="text-white text-center w-full"
                > +{point} Points </h1>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}
