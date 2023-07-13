import Rank from "./Rank";

export default function Leaderboard() {
    return (
        <div className="cont test5 flex justify-center items-center">
            <div className="w-[75%] h-[95%]
            laptop:w-[90%]
            phone:w-[90%]
            Large-phone:w-[90%]
            ">
                <Rank rank={1} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>
                <Rank rank={2} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>
                <Rank rank={3} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>
                <Rank rank={4} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>
                <Rank rank={5} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>
                <Rank rank={6} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={true}/>
                <Rank rank={7} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>
                <Rank rank={8} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>
                <Rank rank={9} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>
                <Rank   rank={10} image="mbjaghou.jpeg" username="Elmehdi assamer" login="eassamer" level="99,1" levelProgress={25} wins={50} loses={10} me={false}/>

            </div>
        </div>
    );
}