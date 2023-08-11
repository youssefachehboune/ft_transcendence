import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import GetContext from "../../context";
import ChatFriends from "../../components/Dashebord/Chat/ChatFriends";
function Chat_Leyout() {
    let golobal = GetContext()
    useEffect(() => {
        golobal.setshowchatsection(true)
        golobal.setshowchanel(false)
        golobal.socketRef.current?.disconnect();
        golobal.handleClick(0);
      }, []);
    return ( 
        <Dashebord>
            <ChatFriends opencreatechanel={golobal.onOpen} openpublic={golobal.openpublic} setshowchanel={golobal.setshowchanel} setchanel={golobal.setchanel} setinvitationList={golobal.setinvitationList} 
            setrequestList={golobal.setrequestList} setmutedList={golobal.setmutedList} setbanList={golobal.setbanList} settypememeber={golobal.settypememeber} setmemebers={golobal.setmemebers} setmumeberschannelloding={golobal.setmumeberschannelloding} 
            setchannelloding={golobal.setchannelloding} mychanel={golobal.mychanel} setListFriends={golobal.setListFriends} setmassagenotif={golobal.setmassagenotif} data={golobal.data} friendsloding={golobal.dataisloded} 
            ListFriends={golobal.ListFriends} onlyChat={golobal.onlyChat} showchatsection={golobal.showchatsection} setshowchatsection={golobal.setshowchatsection} Onlines={golobal.Onlines}/>
        </Dashebord>
     );
}

export default Chat_Leyout;