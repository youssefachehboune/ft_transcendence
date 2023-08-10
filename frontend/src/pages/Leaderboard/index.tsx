import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import { getContext } from "../context";
import Leaderboard from "../../components/Dashebord/Leaderboard";
function leader_Leyout() {
    let golobal = getContext()
    useEffect(() => {
        golobal.setshowchatsection(false)
        golobal.setshowchanel(false)
        golobal.socketRef.current?.disconnect();
      }, []);
    return ( 
        <Dashebord>
            <Leaderboard username={golobal.data.username}/>
        </Dashebord>
     );
}

export default leader_Leyout;