import { AiOutlineArrowRight, AiOutlineUpload } from "react-icons/ai";
import CountryDropdown from "../User-Info/Country";
import { useState, useRef, ChangeEvent, FormEvent, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { getText } from "../../api/lang";
import updateUser from "@/pages/api/updateuser";
import UsernameInput from "../User-Info/username";
import Bioinpute from "../User-Info/Bio";
import { DATA, postReduser } from "@/pages/Hooks/user_info_data";
import Img_profile from "../User-Info/Img_profile";
import Chose_img from "../User-Info/chose_img";
import Uplode_img from "../User-Info/Uplode_img";
import { Button, ModalCloseButton, ModalFooter } from "@chakra-ui/react";

interface FormData {
name: string;
bio: string;
}

const Update_information = ({onClose, data}: any) => {

const [state, dispatch] = useReducer(postReduser, DATA);
// const [data, setdata] = useState<any>('');
const return_avatar = data.avatar;
const avatar = state.selectedAvatar ? state.selectedAvatar : return_avatar;
const MAX_IMAGE_SIZE = 80000; //80kb
const test = getText('LARGE_IMG')
const [formData, setFormData] = useState<FormData>({
    name: "",
    bio: "",
});
// useEffect( () => {
//     fetch('http://localhost:3000/user', { credentials: "include" }).then((resp) => resp.json()).then((data) => setdata(data))
// }, [])

const handleMouseEnter = () => {
    dispatch({type: "ISHOVER", pyload: true})
};

const handleMouseLeave = () => {
    dispatch({type: "ISHOVER", pyload: false})
};
const handleAvatarSelection = (avatarUrl: string) => {
dispatch({type: "ERROR_LARGEIMG", pyload: false})
dispatch({type: "SELECTED_AVATAR", pyload: avatarUrl})
};

const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
dispatch({type: "SELECTED_AVATAR", pyload: ''})
dispatch({type: "ERROR_LARGEIMG", pyload: false})
const file = event.target.files?.[0];
const reader = new FileReader();

reader.onload = () => {
    dispatch({type: "SELECTED_AVATAR", pyload: reader.result as string})
};
if (file) {
    if (file.size > MAX_IMAGE_SIZE) {
    dispatch({type: "ERROR_LARGEIMG", pyload: true})
    dispatch({type: "SELECTED_AVATAR", pyload: avatar})
    event.target.value = "";
    }
    reader.readAsDataURL(file);
}
};

const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
setFormData((prevData) => ({
    ...prevData,
    [e.target.name]: e.target.value,
}));
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();
dispatch({type: "ERROR_MESSAGE", pyload: ""})
if (!state.errorLargeimg && state.error_user && state.ErrorBio)
    await updateUser({ bio: formData.bio,  avatar: avatar, username: formData.name, location: state.name_countrie}, {error: dispatch, onClose: onClose, tree: state.error_user, for: state.ErrorBio});
};

return (
<div className="w-[378px] h-[605px] bg-white absolute z-[100] ml-[20%] rounded-[15px]
                        phone:w-[250px] phone:h-[420px] 
                        Large-phone:w-[270px] Large-phone:h-[470px] 
                        laptop:w-[358px] laptop:h-[500px]
                        desktop:w-[378px] desktop:h-[530px]">

<ModalCloseButton />
<div className="w-full h-[200px] flex items-center flex-col phone:h-[100px] Large-phone:h-[120px] desktop:h-[180px] laptop:h-[140px]">
			<h1 className="font-sora text-[26px] font-[700] phone:text-[17px] Large-phone:text-[18px] laptop:text-[24px]">
				{"Update profile"}
			</h1>
			<div className="w-[130px] h-[130px] phone:w-[70px] phone:h-[70px] Large-phone:w-[80px] Large-phone:h-[80px] desktop:w-[120px]  desktop:h-[120px] laptop:w-[90px] laptop:h-[90px]">
				<img
				className="w-full h-full rounded-full border-[#00DAEA] border-[1.5px] mt-[10px] select-none"
				src={avatar}
				/>
			</div>
			{state.errorLargeimg && (
				<p className="text-red-500 text-[10px] mt-[15px] phone:mt-[9px] phone:text-[8px] Large-phone:mt-[9px] Large-phone:text-[8px]">
				{test}
				</p>
			)}
	</div>
    <Chose_img avatar={avatar} return_avatar={return_avatar} handleAvatarSelection={handleAvatarSelection}/>
    <Uplode_img handleImageUpload={handleImageUpload}/>

    <form onSubmit={handleSubmit} className="w-full h-[291px]  flex flex-col justify-around items-center mt-[10px] phone:h-[260px] phone:mt-[-5px] Large-phone:h-[260px] desktop:h-[260px] laptop:h-[285px] laptop:mt-0 desktop:mt-0 ">
            <UsernameInput handleFormChange={handleFormChange} data={data} errormssage={state.errormssage} dispatch={dispatch} info={data}/>
            <Bioinpute handleFormChange={handleFormChange}  dispatch={dispatch} data={data}/>
            <div className="ml-[30px]">
                <label htmlFor="tree" className="text-[12px] font-[400] phone:text-[9px] Large-phone:text-[10px] laptop:text-[10px]">{getText("LOCATION")}<span className='text-orange'> *</span></label>
                <CountryDropdown dispatch={dispatch} />
            </div>

            <div>
                <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                type={"submit"}
                colorScheme='blue'
                mr={7}
               >
                <h1 className={`text-black  text-[14px] font-sora font-[700] tracking-[0.02em]
                                    phone:text-[10px] phone:p-[5px] Large-phone:text-[10px] Large-phone:p-[5px]`}>

                        save
                        </h1>
                </Button>
                <Button onClick={() => onClose()}>Cancel</Button>
            </div>
    </form>
</div>
);
};

export default Update_information;
