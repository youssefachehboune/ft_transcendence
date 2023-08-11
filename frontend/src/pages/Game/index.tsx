import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import  GetContext  from "../../context";
import Game from "@/components/Dashebord/Game";

function GameSection() {
    let golobal = GetContext()
    useEffect(() => {
        golobal.setshowchatsection(false)
        golobal.setshowchanel(false)
        golobal.socketRef.current?.disconnect();
      }, []);
      
    return ( 
        <Dashebord>
             <Game data={golobal.gameData}/>
        </Dashebord>
     );
}

export default GameSection;