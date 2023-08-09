'use client'
import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import Main from "../../components/Dashebord/Main_Cont";
import { getContext } from "../context";

function Maindash() {
    let golobal = getContext()
    useEffect(() => {
        golobal.setshowchatsection(false)
        golobal.setshowchanel(false)
      }, []);
    return ( 
        <Dashebord>
            <Main/>
        </Dashebord>
     );
}

export default Maindash;