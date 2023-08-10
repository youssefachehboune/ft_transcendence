import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import History from "../../components/Dashebord/History";
import { getContext } from "../context";
function History_Leyout() {
    let dataisloded = getContext()
    useEffect(() => {
        dataisloded.setshowchatsection(false)
        dataisloded.setshowchanel(false)
      }, []);

    return ( 
        <Dashebord>
            <History historieloding={dataisloded.dataisloded} all={dataisloded.allhistorie} />
        </Dashebord>
     );
}

export default History_Leyout;