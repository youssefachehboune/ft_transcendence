import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { BsCheckLg, BsPersonFillSlash } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function List_of_Ban({onClose, isOpen, banList}: any) {
    return ( 
        <Drawer size={'md'} placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent background={'#41424D'}>
            <DrawerHeader borderBottomWidth='1px' color={'white'} className="font-sora font-500">Ban list</DrawerHeader>
            <DrawerCloseButton color={'white'}/>
            <DrawerBody flexDir={'column'}>
              {
                 banList?.map((user: any, index: number) => (
                    <div key={index} className="w-[100%] min-h-[61px] flex  gap-2">
                        <div className={`w-[100%] flex items-center justify-center rounded-l-[6px]`}>
                          <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                  <img src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                          </div>
                          <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                              <h1 className={`text-[13px] font-sora font-[600] text-[#ffffff]`}>{user.firstName + " " + user.lastName}</h1>
                              <h1 className={`text-[10px] font-sora font-[400] text-[#ffffff]`}>{"@" + user.username}</h1>
                          </div>
                        </div>
                        <button className={`w-[111px] bg-[red] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                          <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><BsPersonFillSlash className='mr-[5px]'/>unblock</h1>
                        </button>
                    </div>
                  ))
              }
            </DrawerBody>
        </DrawerContent>
      </Drawer>
     );
}

export default List_of_Ban;