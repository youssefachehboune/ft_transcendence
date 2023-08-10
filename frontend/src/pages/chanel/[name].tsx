import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import { getContext } from "../context";
import List_memebres from "../../components/Dashebord/Chanels/List_memebres";
import { useRouter } from "next/router";
function channel_Leyout() {
    let golobal = getContext()
    const router = useRouter();
    const { name } = router.query;
    useEffect(() => {
        golobal.setshowchatsection(true)
        golobal.setshowchanel(true)
        golobal.socketRef.current?.disconnect();
      }, []);
      useEffect(() => {
        
        if (name)
        {
            golobal.setchannelloding(true); golobal.setmumeberschannelloding(false);
            fetch(`http://localhost:3000/channel/${name}/members`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {golobal.setmemebers(data)}).then(() => 
            fetch(`http://localhost:3000/channel/type/${name}/${golobal.data.username}`, { credentials: "include" }).then((resp) => {return resp.text();}).then((data) => {golobal.settypememeber(data); golobal.setmumeberschannelloding(true)})
            )
            fetch('http://localhost:3000/channel/' + name + '/BANNED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {golobal.setbanList(data)})
            fetch('http://localhost:3000/channel/' + name + '/INVITED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {golobal.setinvitationList(data)})
            fetch('http://localhost:3000/channel/' + name + '/MUTED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {golobal.setmutedList(data)})
            fetch('http://localhost:3000/channel/' + name + '/REQUESTED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {golobal.setrequestList(data)})
            fetch(`http://localhost:3000/channel/${name}`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {golobal.setchanel(data); golobal.setchannelloding(false) })

          }
          

      }, [name]);
    return ( 
        <Dashebord>
            <List_memebres setpublic_channel={golobal.setpublic_channel} setmychanel={golobal.setmychanel} setchanel={golobal.setchanel} 
            setrequestList={golobal.setrequestList} setbanList={golobal.setbanList} setmutedList={golobal.setmutedList} setinvitationList={golobal.setinvitationList}
             setmemebers={golobal.setmemebers} requestList={golobal.requestList} ListFriends={golobal.ListFriends} mutedList={golobal.mutedList} typememeber={golobal.typememeber} 
             invitationList={golobal.invitationList} banList={golobal.banList} mumeberschannelloding={golobal.mumeberschannelloding} 
            channelloding={golobal.channelloding} data={golobal.data} chanel={golobal.chanel} setshowchanel={golobal.setshowchanel} memebers={golobal.memebers}/>
        </Dashebord>
     );
}

export default channel_Leyout;