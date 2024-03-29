import { GameData } from '@/components/Dashebord/Game/gameData';
import { useDisclosure } from '@chakra-ui/react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

const AppContext = createContext<any>(null);

interface status {
  userId: number;
  type: types;
}
enum types {
  online = "online",
  ingame = "ingame",
  offline = "offline",
}
export function AppWrapper({ children }: any) {
    const [dataisloded, setdataisloded] =  useState<boolean>(false)

    const [data, setdata] = useState<any>('');
    const [ListFriends, setListFriends] = useState<any>();
    const [showchatsection, setshowchatsection] = useState<boolean>(false);
    const socketRef = useRef<Socket | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: ispublic, onOpen: openpublic, onClose: closepublic } = useDisclosure()

    const [public_channel, setpublic_channel] = useState<any>();
    const [invitationList, setinvitationList] = useState<any>()
    const [banList, setbanList] = useState<any>()
    const [mutedList, setmutedList] = useState<any>()
    const [requestList, setrequestList] = useState<any>()
    const [channelloding, setchannelloding] = useState<boolean>(false)
    const [mumeberschannelloding, setmumeberschannelloding] = useState<boolean>(false)
    const [mychanel, setmychanel] = useState<any>()
    const [showchanel, setshowchanel] = useState<boolean>(false)
    const [chanel, setchanel] = useState<any>()
    const [memebers, setmemebers] = useState<any>()
    const [typememeber, settypememeber] = useState<any>()
    const [massagenotif, setmassagenotif] = useState<boolean>(false)

    const [gameData, setGameData] = useState<GameData | undefined>(undefined);
    const [Onlines, setOnlines] = useState<status[]>([]);

    const [isShow, setIsShow] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<null | number>(null);

    const handleClick = (index : number) => {
        setIsShow(index === activeIndex ? false : true);
        setActiveIndex(index === activeIndex ? null : index);
    };
    
  return (
    <AppContext.Provider value={{dataisloded, setdataisloded, data, invitationList, banList, setbanList, 
    setdata, ListFriends, setListFriends, showchatsection, setshowchatsection, setinvitationList, mutedList, 
    isOpen, onOpen, onClose,ispublic, openpublic, closepublic, setmutedList, requestList, setrequestList, channelloding, setchannelloding,
    mumeberschannelloding, setmumeberschannelloding, mychanel, setmychanel, showchanel, setshowchanel, chanel, setchanel, memebers,  setmemebers, typememeber, settypememeber,
    massagenotif, setmassagenotif, public_channel, setpublic_channel, gameData, setGameData, setOnlines, Onlines, socketRef,
    handleClick, activeIndex, 
    }}>
      {children}
    </AppContext.Provider>
  );
}
export default  function GetContext() {
  return useContext(AppContext);
}