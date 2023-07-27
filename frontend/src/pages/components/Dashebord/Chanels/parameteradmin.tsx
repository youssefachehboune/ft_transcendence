import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonCircle, SkeletonText, useDisclosure } from "@chakra-ui/react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsPersonFillAdd, BsPersonFillSlash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { HiOutlineBan } from "react-icons/hi";
import { VscSettingsGear } from "react-icons/vsc";

function Param({openbanlist, data, user, index, onOpen, back, openlistinvitation}: any)
{
    return (
        data?.username == user.username && user.type == "MEMBER" ? (
                <Menu>
                    <MenuButton className={`self-end absolute mr-[30px] xl:mr-[50px] mt-[25px] ${back ? "xl:hidden" : ""} `}>
                        <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                    </MenuButton>
                <MenuList>
                    <MenuItem icon={<BsPersonFillSlash />}>leave</MenuItem>
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
                        <MenuItem icon={<BsPersonFillAdd />}>
                        add member
                        </MenuItem>
                        <MenuItem onClick={openbanlist} icon={<HiOutlineBan />}>
                        list of ban
                        </MenuItem>
                        <MenuItem icon={<BsPersonFillSlash />}>leave</MenuItem>
                    </MenuList>
                </Menu>
            ): data.username == user.username && user.type == "OWNER" ?
            (
                <Menu>
                    <MenuButton className={`self-end absolute mr-[30px] xl:mr-[50px] mt-[25px] ${back ? "xl:hidden" : ""} `}>
                        <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<GrUpdate />}>
                        update chanel
                        </MenuItem>
                        <MenuItem onClick={openlistinvitation} icon={<BsPersonFillAdd />}>
                        invitation list
                        </MenuItem>
                        <MenuItem icon={<BsPersonFillAdd />}>
                        add member
                        </MenuItem>
                        <MenuItem onClick={openbanlist} icon={<HiOutlineBan />}>
                        list of ban
                        </MenuItem>
                        <MenuItem onClick={onOpen} icon={<AiTwotoneDelete />}>
                        delete chanel
                        </MenuItem>

                    </MenuList>
                </Menu>
            ): null

    )
}

function Parameteradmin({openbanlist, openlistinvitation, data, memebers, back, onOpen}: any) {
    return (
        memebers?.map((user: any, index: number) => (
            <Param openbanlist={openbanlist} openlistinvitation={openlistinvitation} user={user} index={index} data={data} onOpen={onOpen} back={back}/>
        ))
     );
}

export default Parameteradmin;