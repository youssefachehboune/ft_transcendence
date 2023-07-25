function Memeber({index, user}: any) {
    return ( 
        <div key={index} className="min-h-[61px] flex items-center">
        <button className={`w-[80%] flex items-center justify-center rounded-l-[6px]`}>
            <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                    <img src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                    <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute`}></div>
            </div>
            <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                <h1 className={`text-[13px] font-sora font-[600] text-[white]`}>{user.firstName + " " + user.lastName}</h1>
                <h1 className={`text-[10px] font-sora font-[400] text-[#969696]`}>{"@" + user.username}</h1>
            </div>
        </button>
        <button className={`w-[20%] h-full rounded-r-[6px] text-white`}>
            ...
        </button>
</div>
     );
}

export default Memeber;