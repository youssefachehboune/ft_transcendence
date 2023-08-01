import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { HiUserAdd } from "react-icons/hi";
function Search_Public_chanel({onClose, isOpen, public_channel}: any) {

    return ( 
        <Modal size={'xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent background={'#41424D'} height={'450px'}>
            <ModalHeader borderBottomWidth='1px' color={'white'} className="font-sora font-500">Search for chanels</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow={'hidden'}>
                <FormControl>
                <FormLabel textColor={'white'}>search</FormLabel>
                  <Input textColor={'white'} placeholder='name chanel' />
                </FormControl>
                <br/>
                <div className="w-[100%] h-[270px] test5 flex flex-col gap-1 rounded-[7px] overflow-y-auto">
                  {
                    public_channel?.map((user: any, index: number) => (
                      <div key={index} className="w-[100%] min-h-[61px] flex  gap-2">
                          <div className={`w-[100%] flex items-center  rounded-l-[6px]`}>
                            <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                    <img src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                            </div>
                            <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                                <h1 className={`text-[13px] font-sora font-[600] text-[#ffffff]`}>{user.name}</h1>
                                <h1 className={`text-[10px] font-sora font-[400] text-[#ffffff]`}>{user.description}</h1>
                            </div>
                          </div>
                          <button className={`w-[111px] bg-[#14FF00] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                            <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><HiUserAdd className='mr-[5px]'/>join</h1>
                          </button>
                      </div>
                    ))

                    }
                </div>
            </ModalBody>
        </ModalContent>
      </Modal>
     );
}

export default Search_Public_chanel;