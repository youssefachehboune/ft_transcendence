import { VscSearch } from "react-icons/vsc";

function Friends({handelsearchChanges}: any) {
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
        f:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        g:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        h:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        i:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        l:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        k:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },

    };
    const test = Object.values(obj);
    return ( 
        <div className="cont overflow-hidden flex gap-[10px]" >
            <div className="w-[40%] 2xl:w-[100%] xl:w-[100%] h-[100%] test5 flex flex-col items-center overflow-y-auto rounded-[10px]">
                                    <div className="w-[100%] h-auto flex flex-col items-center">
                                        <div className={`test5 w-[50%] h-[28px] flex justify-center items-center rounded-[15px] mt-[20px]`}>
                                            <div className="mr-[-5px]">
                                                <VscSearch className="w-[12px] h-[12px]" color="white" />
                                            </div>
                                            <input
                                                onKeyDown={handelsearchChanges}
                                                type="text"
                                                placeholder="Search friends"
                                                className="text-white text-[8px] font-sora font-[300] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                                                />
                                            </div>
                                            <div className="w-[85%] h-[30px] self-end mt-[20px]">
                                                    <h1 className="font-[700] font-sora text-[11px] text-white">999 Friends</h1>
                                            </div>

                                    </div>
                                        <div className="w-[100%] h-[100%] gap-[10px] flex flex-col">
                                            {test.map((user: any, key) => (
                                                <div key={key} className="min-h-[61px] flex items-center">
                                                    <div className="w-[70%] flex items-center justify-center">
                                                        <img src={user.img} alt="" className="w-[54px] rounded-full"/>
                                                        <div className="w-[150px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                            <h1 className="text-[13px] font-sora font-[600] text-[white]">{user.name}</h1>
                                                            <h1 className="text-[10px] font-sora font-[400] text-[#969696] ">{"@" + user.login}</h1>
                                                        </div>
                                                    </div>
                                                    <button className="text-white ml-[20%] mb-[10px]">
                                                        ...
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
            </div>
            <div className="w-[60%] h-[100%] test5 rounded-[10px]">

            </div>
        </div>
     );
}

export default Friends;