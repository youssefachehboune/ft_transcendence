import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, useRef, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
function Createchanel({isOpen, onClose}: any) {
  const [typechanel , settypechanel] = useState<any>("")
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [large_img, setlarge_img] = useState<boolean>(false)
  const [avatarchanel, setavatarchanel] = useState<any>('')
  const MAX_IMAGE_SIZE = 80000; //80kb


  const handleCountrySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    settypechanel(event.target.value)
  };
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setlarge_img(false)
    setavatarchanel("")
    const file = event.target.files?.[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      setavatarchanel(reader.result as string)
    };
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setavatarchanel("")
        setlarge_img(true)
      event.target.value = "";
      }
      reader.readAsDataURL(file);
    }
    };

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    return ( 
        <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent height={'650px'}>
          <ModalHeader>Create channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl>
              <div className="w-[100%] h-[170px] flex items-center justify-center">
                    <div onClick={handleClick} className={`w-[120px] h-[120px] flex items-center justify-center rounded-full ${avatarchanel ? "" : "border-black border-[7px] border-dashed"}  cursor-pointer`}>
                      <input
                      onChange={handleImageUpload}
                        ref={fileInputRef}
                        id="file-input"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                      {avatarchanel && <img src={avatarchanel} alt="" className="w-[full] h-full rounded-full"/>}
                      {!avatarchanel && <BsCameraFill className="w-[40px] h-[40px]"/>}
                    </div>
              </div>
              {large_img && <p className="text-red-500 text-[10px] text-center">the image is too large: max size(80kb)</p>}
            </FormControl>
            <FormControl>
              <FormLabel>channel Name</FormLabel>
              <Input  placeholder='channel Name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Channel Description</FormLabel>
              <Input placeholder='Channel Description' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Channel Type</FormLabel>
              <Select onChange={handleCountrySelect}>
                <option value={''}>chose type of chanel</option>
                <option value="Private">Private</option>
                <option value="Public">Public</option>
                <option value="Protected">Protected</option>
              </Select>
            </FormControl>
            {
              typechanel === "Protected" ? (
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder='Inter your password' />
                </FormControl>
            ): null
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
     );
}

export default Createchanel;
