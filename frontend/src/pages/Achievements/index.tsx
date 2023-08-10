import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import Achievements from "../../components/Dashebord/Achievements";
import { getContext } from "../context";
function achive_Leyout() {
    let golobal = getContext()
    useEffect(() => {
        golobal.setshowchatsection(false)
        golobal.setshowchanel(false)
        golobal.socketRef.current?.disconnect();
      }, []);
    return ( 
        <Dashebord>
            <Achievements/>
        </Dashebord>
     );
}

export default achive_Leyout;