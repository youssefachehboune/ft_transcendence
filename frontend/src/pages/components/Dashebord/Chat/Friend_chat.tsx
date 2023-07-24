function Friend_chat({index, changecolor, setchangecolor, user, setchatloding, setonlyChat, setfriendchat}: any) {
    return ( 
        <div key={user.user_id} className="min-h-[61px] flex items-center">
        <button onClick={() =>
        {
            setonlyChat(false)
            setchatloding(true)
            setchangecolor((prev: any) => (prev === index ? null : index));
            fetch('http://localhost:3000/profile/' + user.username , { credentials: "include" }).then((resp) => { return resp.json(); }).then((data) => {setfriendchat(data); setchatloding(false)}).then(() => setonlyChat(true))
        }
        } className={`w-[80%] flex items-center justify-center rounded-l-[6px] ${changecolor ? "bg-[#00DAEA]": ""}`}>
            <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                    <img src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                    <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute`}></div>
            </div>
            <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                <h1 className={`text-[13px] font-sora font-[600] text-[white] ${changecolor ? "text-black" : ""}`}>{user.firstName + " " + user.lastName}</h1>
                <h1 className={`text-[10px] font-sora font-[400] text-[#969696] ${changecolor ? "text-black" : ""}`}>{"@" + user.username}</h1>
            </div>
        </button>
        <button className={`w-[20%] h-full rounded-r-[6px] ${changecolor ? "bg-[#00DAEA] text-black": "text-white"}`}>
            ...
        </button>
</div>
     );
}

export default Friend_chat;