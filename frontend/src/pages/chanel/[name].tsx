import React, { useContext, useEffect } from "react";
import Dashebord from "../Dashboard";
import GetContext from "../context";
import List_memebres from "../../components/Dashebord/Chanels/List_memebres";
import { useRouter } from "next/router";
function Channel_Leyout() {
    let global = GetContext()
    const router = useRouter();
    const { name } = router.query;
    useEffect(() => {
        global.setshowchatsection(true)
        global.setshowchanel(true)
        global.socketRef.current?.disconnect();
        global.socketRef.current = null;
      }, []);
      useEffect(() => {
        
        if (name)
        {
            global.setchannelloding(true); global.setmumeberschannelloding(false);
            fetch(`http://localhost:3000/channel/${name}/members`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {global.setmemebers(data)}).then(() => 
            fetch(`http://localhost:3000/channel/type/${name}/${global.data.username}`, { credentials: "include" }).then((resp) => {return resp.text();}).then((data) => {global.settypememeber(data); global.setmumeberschannelloding(true)})
            )
            fetch('http://localhost:3000/channel/' + name + '/BANNED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {global.setbanList(data)})
            fetch('http://localhost:3000/channel/' + name + '/INVITED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {global.setinvitationList(data)})
            fetch('http://localhost:3000/channel/' + name + '/MUTED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {global.setmutedList(data)})
            fetch('http://localhost:3000/channel/' + name + '/REQUESTED', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {global.setrequestList(data)})
            fetch(`http://localhost:3000/channel/${name}`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {global.setchanel(data); global.setchannelloding(false) })

          }
          

      }, [name]);
    return ( 
        <Dashebord>
            <List_memebres setpublic_channel={global.setpublic_channel} setmychanel={global.setmychanel} setchanel={global.setchanel} 
            setrequestList={global.setrequestList} setbanList={global.setbanList} setmutedList={global.setmutedList} setinvitationList={global.setinvitationList}
             setmemebers={global.setmemebers} requestList={global.requestList} ListFriends={global.ListFriends} mutedList={global.mutedList} typememeber={global.typememeber} 
             invitationList={global.invitationList} banList={global.banList} mumeberschannelloding={global.mumeberschannelloding} 
            channelloding={global.channelloding} data={global.data} chanel={global.chanel} setshowchanel={global.setshowchanel} memebers={global.memebers}/>
        </Dashebord>
     );
}

export default Channel_Leyout;