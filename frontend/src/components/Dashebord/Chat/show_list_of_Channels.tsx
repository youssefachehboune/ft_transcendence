import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function Show_list_of_Channels(props: any) {

  const router = useRouter()
    const truncateDescription = (description: string) => {
      return description.length > 20 ? description.substring(0, 20) + "..." : description;
  };
    const fetchdata = (item: any) => 
    {
            props.setshowchatsection(false); 
            props.setshowchanel(true); 
            fetch(`http://localhost:3000/channel/${item.name}/members`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {props.setmemebers(data)}).then(() => 
            fetch(`http://localhost:3000/channel/type/${item.name}/${props.data.username}`, { credentials: "include" }).then((resp) => {return resp.text();}).then((data) => {props.settypememeber(data); props.setmumeberschannelloding(true)})
            )
            fetch('http://localhost:3000/channel/' + item.name + '/BANNED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {props.setbanList(data)}).catch(e => {console.log(e)})
            fetch('http://localhost:3000/channel/' + item.name + '/INVITED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {props.setinvitationList(data)}).catch(e => {console.log(e)})
            fetch('http://localhost:3000/channel/' + item.name + '/MUTED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {props.setmutedList(data)}).catch(e => {console.log(e)})
            fetch('http://localhost:3000/channel/' + item.name + '/REQUESTED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {props.setrequestList(data)}).catch(e => {console.log(e)})
            fetch(`http://localhost:3000/channel/${item.name}`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {props.setchanel(data); props.setchannelloding(false) })
    }
    return ( 
        <>
        <Modal
          isOpen={props.isOpen}
          onClose={props.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent background={'#41424D'} height={'400px'}>
            <ModalHeader borderBottomWidth='1px' color={'white'} className="font-sora font-500">choose channel</ModalHeader>
            <ModalCloseButton color={'white'}/>
            <ModalBody flexDir={'column'}>
            <div className="w-[100%] h-[270px] test5 flex flex-col gap-1  overflow-y-auto">
                      {
                        props.mychanel && Array.isArray(props.mychanel) && props.mychanel?.map((channel: any, index: number) => (
                              <button onClick={() => { props.setchannelloding(true); props.setmumeberschannelloding(false); fetchdata(channel); router.push(`/chanel/${channel.name}`)}} key={index} className="w-[100%] min-h-[61px] flex gap-2 hover:bg-[#5b5b5b] rounded-[6px]">
                                  <div className={`w-[80%] flex items-center justify-center rounded-l-[6px]`}>
                                    <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                            <Image width={'54'} height={'54'} src={channel.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                    </div>
                                    <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                                        <h1 className={`text-[13px] font-sora font-[600] text-[#ffffff]`}>{channel.name}</h1>
                                        <h1 className={`text-[10px] font-sora font-[400] text-[#ffffff]`}>{truncateDescription(channel.description)}</h1>
                                    </div>
                                  </div>
                              </button>
    
                          )
                        )
                      }
                  </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
     );
}

export default Show_list_of_Channels;