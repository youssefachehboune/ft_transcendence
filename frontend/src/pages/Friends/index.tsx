import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import  GetContext  from "../../context";
import Friends from "../../components/Dashebord/Friendes/Friends";
function Friends_Leyout() {
    let global = GetContext()
    useEffect(() => {
        global.setshowchatsection(false);
        global.setshowchanel(false)
        global.socketRef.current?.disconnect();
        global.socketRef.current = null;
      }, []);


    return ( 
        <Dashebord>
            <Friends setListFriends={global.setListFriends} setonlyChat={global.setonlyChat} friendsloding={global.dataisloded} ListFriends={global.ListFriends} setshowchatsection={global.setshowchatsection} Onlines={global.Onlines} data={global.data}/>
        </Dashebord>
     );
}

export default Friends_Leyout;