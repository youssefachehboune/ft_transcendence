'use client'
import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import Main from "../../components/Dashebord/Main_Cont";
import  GetContext  from "../context";

function Maindash() {
    let golobal = GetContext()
    useEffect(() => {
        golobal.setshowchatsection(false)
        golobal.setshowchanel(false)
        golobal.socketRef.current?.disconnect();
        golobal.socketRef.current = null;
      }, []);
    return ( 
        <Dashebord>
            <Main/>
        </Dashebord>
     );
}

export default Maindash;