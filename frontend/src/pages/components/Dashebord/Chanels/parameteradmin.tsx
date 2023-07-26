import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonCircle, SkeletonText, useDisclosure } from "@chakra-ui/react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsPersonFillAdd, BsPersonFillSlash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { HiOutlineBan } from "react-icons/hi";
import { VscSettingsGear } from "react-icons/vsc";

function Parameteradmin({back, onOpen}: any) {
    return ( 
        <Menu>
        <MenuButton className={`self-end absolute mr-[30px] xl:mr-[50px] mt-[25px] ${back ? "xl:hidden" : ""} `}>
            <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
        </MenuButton>
        <MenuList>
            <MenuItem icon={<GrUpdate />}>
            update chanel
            </MenuItem>
            <MenuItem icon={<BsPersonFillAdd />}>
            list of invitation
            </MenuItem>
            <MenuItem icon={<BsPersonFillAdd />}>
            add member
            </MenuItem>
            <MenuItem icon={<HiOutlineBan />}>
            list of ban
            </MenuItem>
            <MenuItem onClick={onOpen} icon={<AiTwotoneDelete />}>
            delete chanel
            </MenuItem>
            <MenuItem icon={<BsPersonFillSlash />}>leave</MenuItem>
        </MenuList>
        </Menu>
     );
}

export default Parameteradmin;