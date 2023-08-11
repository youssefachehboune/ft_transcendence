import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import  GetContext from "../../context";
import Leaderboard from "../../components/Dashebord/Leaderboard";
function Leader_Leyout() {
    let global = GetContext()
    useEffect(() => {
        global.setshowchatsection(false)
        global.setshowchanel(false)
      }, [global]);
    return ( 
        <Dashebord>
            <Leaderboard username={global.data.username}/>
        </Dashebord>
     );
}

export default Leader_Leyout;