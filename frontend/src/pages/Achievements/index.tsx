import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import Achievements from "../../components/Dashebord/Achievements";
import GetContext from "../../context";
function Achive_Leyout() {
    let global = GetContext()
    useEffect(() => {
        global.setshowchatsection(false)
        global.setshowchanel(false)
        global.socketRef.current?.disconnect();
        global.socketRef.current = null;
        global.setGameData(undefined);
      }, []);
    return ( 
        <Dashebord>
            <Achievements/>
        </Dashebord>
     );
}

export default Achive_Leyout;