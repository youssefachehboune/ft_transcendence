import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import { getContext } from "../context";
import Friends from "../../components/Dashebord/Friendes/Friends";
function Friends_Leyout() {
    let global = getContext()
    useEffect(() => {
        global.setshowchatsection(false);
        global.setshowchanel(false)
      }, []);


    return ( 
        <Dashebord>
            <Friends setListFriends={global.setListFriends} setonlyChat={global.setonlyChat} friendsloding={global.dataisloded} ListFriends={global.ListFriends} setshowchatsection={global.setshowchatsection}/>
        </Dashebord>
     );
}

export default Friends_Leyout;