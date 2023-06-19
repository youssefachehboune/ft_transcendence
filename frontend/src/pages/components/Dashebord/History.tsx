import { useState } from "react";

function History() {

    const obj : any = {
        one:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        tow:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        tree:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        for:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        five:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        sex:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        a:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        b:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        c:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        e:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        v:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
    };
    const test = Object.values(obj);
    return ( 
        <div className="cont flex  justify-center overflow-hidden">
            <div className="w-[100%] h-[100%] flex flex-col items-center gap-[30px] rounded-t-[10px] rounded-l-[10px] overflow-y-auto test5">
                    <div className="w-[100%] h-auto flex justify-center">
                        <select className="w-[85px] h-[19px] test5 mt-[10px] rounded-[4px] text-[white] text-[13px] pl-2 font-[400] font-sora">
                            <option value={'all'}>all</option>
                            <option value={'friend'}>friend</option>
                            <option value={'win'}>win</option>
                        </select>
                    </div>
                {test.map((user: any, key) => (
                    <div key={key} className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
                        <div className="w-[33.5%] flex items-center justify-end">
                            <img src={user.img} alt="" className="w-[54px] rounded-full"/>
                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.name}</h1>
                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.login}</h1>
                            </div>
                        </div>
                        <div className="w-[33.5%] flex flex-col items-center justify-center">
                            <h1 className="text-[22px] font-sora font-[400] text-[white]">7 : 5</h1>
                            <h1 className="text-[9px] font-sora font-[400] text-[#B3B3B3]">1 Hours ago</h1>
                        </div>
                        <div className="w-[33.5%] flex items-center justify-start">
                            <img src={user.img} alt="" className="w-[54px] rounded-full"/>
                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.name}</h1>
                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.login}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}

export default History;