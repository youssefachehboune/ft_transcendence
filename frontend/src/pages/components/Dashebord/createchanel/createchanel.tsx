import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import Uplode_chanel_img from "./uplode_chanel_img";
import Chanel_name from "./chanel_name";
import Typechanel from "./typechanel";
import Channel_Description from "./Channel_Description";
import Chanel_password from "./chanel_password";

function Createchanel({isOpen, onClose}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [large_img, setlarge_img] = useState<string>('')
  const [avatarchanel, setavatarchanel] = useState<any>('')
  const MAX_IMAGE_SIZE = 80000;
  const [chanelname, setchanelname] = useState<string>("")
  const [Errornamechanel, setErrornamechanel] = useState<string>("")
  const [Errorpassword, setErrorpassword] = useState<string>("")
  const [ErrorDescriptionchanel, setErrorDescriptionchanel] = useState<string>("")
  const [ChannelDescription, setChannelDescription] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [typechanel , settypechanel] = useState<any>("")
  const [Errortypechanel , setErrortypechanel] = useState<any>("")


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
  const confirm = () => 
  {
      if (!chanelname)
        setErrornamechanel("required")
      if (!ChannelDescription)
        setErrorDescriptionchanel("required")
      if (typechanel === "Protected" && !password)
        setErrorpassword("required")
      if (!typechanel)
        setErrortypechanel("required")
      if (!avatarchanel)
        setlarge_img("required")
      if (!Errornamechanel && !ErrorDescriptionchanel && !Errorpassword && chanelname && ChannelDescription && typechanel &&  !large_img)
      {
        if (typechanel === "Protected" && password || typechanel != "Protected" && !password)
        {
          console.log("chanelname=" + chanelname)
          console.log("ChannelDescription=" + ChannelDescription)
          console.log("password=" + password)
          console.log("typechanel=" + typechanel)
          onclose()
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
        setlarge_img("the image is too large: max size(80kb)")
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
        <ModalContent height={'800px'}>
          <ModalHeader>Create channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Uplode_chanel_img handleClick={handleClick} handleImageUpload={handleImageUpload} large_img={large_img} avatarchanel={avatarchanel} fileInputRef={fileInputRef}/>
            <Chanel_name chanelname={chanelname} setchanelname={setchanelname} Error={Errornamechanel} setError={setErrornamechanel}/>
            <Channel_Description ChannelDescription={ChannelDescription} setChannelDescription={setChannelDescription} Error={ErrorDescriptionchanel} setError={setErrorDescriptionchanel}/>
            <Typechanel handleCountrySelect={handleCountrySelect} Error={Errortypechanel}/>
            {typechanel === "Protected" && <Chanel_password Error={Errorpassword} setError={setErrorpassword} setpassword={setpassword}/>}
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

export default Createchanel;
