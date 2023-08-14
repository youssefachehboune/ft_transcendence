import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonCircle, SkeletonText, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsPersonFillAdd, BsPersonFillSlash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { HiOutlineBan } from "react-icons/hi";
import { VscSettingsGear } from "react-icons/vsc";

function Param({setpublic_channel, setmychanel, chanel, openrequested, openupdate, openmuted, openaddmember, openbanlist, data, user, onOpen, back, openlistinvitation}: any)
{
    const router = useRouter()
    const handleliveClick = () => {
        setpublic_channel((prevChannels: any) => [...prevChannels, chanel]);
        setmychanel((prev: any) => prev.filter((chanels: any) => chanels.name !== chanel.name))
        const leave : {name: string, password: string | undefined | null} = {name: chanel.name, password: chanel.password};
        fetch(`http://localhost:3000/channel/user/leave`, {
            credentials: "include",
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(leave),
          })
          router.push('/Home')
        
      };
    return (
        data?.username == user.username && user.type == "MEMBER" ? (
                <Menu>
                    <MenuButton className={`self-end absolute mr-[30px] xl:mr-[50px] mt-[25px] ${back ? "xl:hidden" : ""} `}>
                        <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                    </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleliveClick} icon={<BsPersonFillSlash />}>leave</MenuItem>
                </MenuList>
                </Menu>
            ): data?.username == user.username && user.type == "ADMIN" ?
            (
                <Menu>
                    <MenuButton className={`self-end absolute mr-[30px] xl:mr-[50px] mt-[25px] ${back ? "xl:hidden" : ""} `}>
                        <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                    </MenuButton>
                        <MenuList>
                        <MenuItem onClick={openlistinvitation} icon={<BsPersonFillAdd />}>
                        invitation list
                        </MenuItem>
                        {chanel?.type == "PRIVATE" &&  
                        <MenuItem onClick={openrequested} icon={<BsPersonFillAdd />}>
                        requested list
                        </MenuItem>
                        }
                        <MenuItem onClick={openaddmember} icon={<BsPersonFillAdd />}>
                        add member
                        </MenuItem>
                        <MenuItem onClick={openbanlist} icon={<HiOutlineBan />}>
                        list of ban
                        </MenuItem>
                        <MenuItem onClick={openmuted} icon={<HiOutlineBan />}>
                        muted list
                        </MenuItem>
                        <MenuItem onClick={handleliveClick} icon={<BsPersonFillSlash />}>leave</MenuItem>
                    </MenuList>
                </Menu>
            ): data.username == user.username && user.type == "OWNER" ?
            (
                <Menu>
                    <MenuButton className={`self-end absolute mr-[30px] xl:mr-[50px] mt-[25px] ${back ? "xl:hidden" : ""} `}>
                        <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={openupdate} icon={<GrUpdate />}>
                        update chanel
                        </MenuItem> 
                        <MenuItem onClick={openlistinvitation} icon={<BsPersonFillAdd />}>
                        invitation list
                        </MenuItem>
                        
                        {chanel?.type == "PRIVATE" &&  
                        <MenuItem onClick={openrequested} icon={<BsPersonFillAdd />}>
                        requested list
                        </MenuItem>
                        }                       
                        <MenuItem onClick={openaddmember} icon={<BsPersonFillAdd />}>
                        add member
                        </MenuItem>
                        <MenuItem onClick={openbanlist} icon={<HiOutlineBan />}>
                        list of ban
                        </MenuItem>
                        <MenuItem onClick={openmuted} icon={<HiOutlineBan />}>
                        muted list
                        </MenuItem>
                        <MenuItem onClick={onOpen} icon={<AiTwotoneDelete />}>
                        delete chanel
                        </MenuItem>

                    </MenuList>
                </Menu>
            ): null

    )
}

function Parameteradmin({setpublic_channel, setshowchanel, setmychanel, chanel, openrequested, openupdate, openmuted, openaddmember, openbanlist, openlistinvitation, data, memebers, back, onOpen}: any) {
    return (
        memebers && Array.isArray(memebers) && memebers?.map((user: any, index: number) => (
            <Param setpublic_channel={setpublic_channel} setshowchanel={setshowchanel} setmychanel={setmychanel} key={index} chanel={chanel} openrequested={openrequested} openupdate={openupdate} openmuted={openmuted} openaddmember={openaddmember} openbanlist={openbanlist} openlistinvitation={openlistinvitation} user={user} index={index} data={data} onOpen={onOpen} back={back}/>
        ))
     );
}

export default Parameteradmin;