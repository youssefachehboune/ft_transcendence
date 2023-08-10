import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import History from "../../components/Dashebord/History";
import  GetContext  from "../context";
function History_Leyout() {
    let dataisloded = GetContext()
    useEffect(() => {
        dataisloded.setshowchatsection(false)
        dataisloded.setshowchanel(false)
        dataisloded.socketRef.current?.disconnect();
        dataisloded.socketRef.current = null;
      }, []);

    return ( 
        <Dashebord>
            <History historieloding={dataisloded.dataisloded} all={dataisloded.allhistorie} />
        </Dashebord>
     );
}

export default History_Leyout;