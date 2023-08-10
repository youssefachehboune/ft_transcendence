import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Uplode_chanel_img from "../createchanel/uplode_chanel_img";
import Chanel_name from "../createchanel/chanel_name";
import Channel_Description from "../createchanel/Channel_Description";
import Typechanel from "../createchanel/typechanel";
import Chanel_password from "../createchanel/chanel_password";
import Updatechanel from "@/pages/api/Updatechanel";
import socket from '../../../../pages/chatSocket'

function Update_chanel({
setchanel,
large_img,
setlarge_img,
avatarchanel,
setavatarchanel,
chanelname,
setchanelname,
Errornamechanel,
setErrornamechanel,
Errorpassword,
setErrorpassword,
ErrorDescriptionchanel,
setErrorDescriptionchanel,
ChannelDescription,
setChannelDescription,
password,
setpassword,
typechanel,
settypechanel,
Errortypechanel,
setErrortypechanel,
chanel, 
isOpen, 
onClose
}: any) 
{

  const MAX_IMAGE_SIZE = 5242880;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
      
        const handleCountrySelect = (event: ChangeEvent<HTMLSelectElement>) => {
          setErrorpassword('')
          setErrortypechanel('')
          settypechanel(event.target.value)
        };
        const onclose = () => 
        {
            setlarge_img('')
            setavatarchanel('')
            settypechanel('')
            setErrornamechanel('')
            setchanelname('')
            setErrorDescriptionchanel('')
            setChannelDescription('')
            setpassword('')
            setErrorpassword('')
            setErrortypechanel('')
            onClose()
        }
        const confirm = async () => 
        {
            if (!chanelname)
              setErrornamechanel("required")
            if (!ChannelDescription)
              setErrorDescriptionchanel("required")
            if (typechanel === "PROTECTED" && !password)
              setErrorpassword("required")
            if (!typechanel)
              setErrortypechanel("required")
            if (!avatarchanel)
              setlarge_img("required")
            if (!Errornamechanel && !ErrorDescriptionchanel && !Errorpassword && chanelname && ChannelDescription && typechanel &&  !large_img)
            {
              if (typechanel === "PROTECTED" && password || typechanel != "PROTECTED" && !password)
              {
                await Updatechanel({ avatar: avatarchanel, name: chanelname,  description: ChannelDescription, password: password, type: typechanel}, chanel, () => onclose(), setErrornamechanel, setchanel, socket);
              }
            }
      
        }
        const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
          setlarge_img('')
          setavatarchanel("")
          const file = event.target.files?.[0];
          const reader = new FileReader();
        
          reader.onload = () => {
            setavatarchanel(reader.result as string)
          };
          if (file) {
            if (file.size > MAX_IMAGE_SIZE) {
              setavatarchanel("")
              setlarge_img("the image is too large: max size(5mb)")
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
              onClose={onclose}
            >
              <ModalOverlay />
              <ModalContent height={['800px', '900px', '800px', '800px']}     width={['100%','60%','100%', '100%',]}>
                <ModalHeader>Update channel</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Uplode_chanel_img handleClick={handleClick} handleImageUpload={handleImageUpload} large_img={large_img} avatarchanel={avatarchanel} fileInputRef={fileInputRef}/>
                  <Chanel_name  chanelname={chanelname} setchanelname={setchanelname} Error={Errornamechanel} setError={setErrornamechanel}/>
                  <Channel_Description ChannelDescription={ChannelDescription} setChannelDescription={setChannelDescription} Error={ErrorDescriptionchanel} setError={setErrorDescriptionchanel}/>
                  <Typechanel typechanel={typechanel} handleCountrySelect={handleCountrySelect} Error={Errortypechanel}/>
                  {typechanel === "PROTECTED" && <Chanel_password Error={Errorpassword} setError={setErrorpassword} setpassword={setpassword}/>}
                </ModalBody>
                <ModalFooter>
                  <Button onClick={confirm} colorScheme='blue' mr={3}>
                    confirm
                  </Button>
                  <Button onClick={onclose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
           );
}

export default Update_chanel;