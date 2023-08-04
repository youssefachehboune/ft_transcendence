import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import Join_channels from "./join_channels";
import { useEffect, useRef, useState } from "react";
function Search_Public_chanel({setmychanel, setpublic_channel, public_channel, onClose, isOpen}: any) {
    const inputeRef = useRef<HTMLInputElement | null>(null);
    const [searchchanels, setsearchchanels] = useState<string | undefined>("");
    const [chaneldata, setchaneldata] = useState<any>();


    const handelsearchChanges = () =>
    {
        setsearchchanels(inputeRef.current?.value);
    }
    useEffect(() => {
      if (searchchanels)
          fetch(`http://localhost:3000/channel/${searchchanels}`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {setchaneldata(data);})
  }, [searchchanels])
    return ( 
        <Modal size={'xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent background={'#41424D'} height={'450px'}>
            <ModalHeader borderBottomWidth='1px' color={'white'} className="font-sora font-500">Search for chanels</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow={'hidden'}>
                <FormControl>
                <FormLabel fontSize={'14px'} fontFamily={'sora'} fontWeight={'400'}  textColor={'white'}>search</FormLabel>
                  <Input onChange={handelsearchChanges} ref={inputeRef} borderRadius={'5px'} fontSize={'12px'} fontFamily={'sora'} fontWeight={'400'} textColor={'white'} placeholder='name chanel'/>
                </FormControl>
                <br/>
                <div className="w-[100%] h-[270px] test5 flex flex-col gap-1 rounded-[7px] overflow-y-auto">
                  {
                    searchchanels === "" ? (
                      public_channel?.map((user: any, index: number) => (
                        <Join_channels setmychanel={setmychanel} setpublic_channel={setpublic_channel} user={user}/>
                      ))
                    ) : (
                        public_channel?.length != 0 && <h1 className='text-white text-[15px] font-sora font-[700] text-center'>Not Found</h1>
                    )
                    }
                </div>
            </ModalBody>
        </ModalContent>
      </Modal>
     );
}

export default Search_Public_chanel;