	import { AiOutlineArrowRight, AiOutlineUpload } from "react-icons/ai";
	import CountryDropdown from "./Country";
	import { useState, useRef, ChangeEvent, FormEvent, useEffect, useReducer } from "react";
	import { useRouter } from "next/router";
	import { getText } from "../../api/lang";
	import getUser from "../../api/user";
	import updateUser from "@/pages/api/updateuser";
	import UsernameInput from "./username";
	import Bioinpute from "./Bio";
	import { DATA, postReduser } from "@/pages/Hooks/user_info_data";
	import Img_profile from "./Img_profile";
	import Chose_img from "./chose_img";
	import Uplode_img from "./Uplode_img";
	import Skip_link from "./Skip_link";


	interface FormData {
	name: string;
	bio: string;
	}
	interface Signin{
		setShowFirstComponent: React.Dispatch<React.SetStateAction<boolean>>;
		setShowSecondComponent: React.Dispatch<React.SetStateAction<boolean>>;
	}

	const Sign_up_page = ({ setShowFirstComponent, setShowSecondComponent}: Signin) => {
	
	const [state, dispatch] = useReducer(postReduser, DATA);
	const [data, setdata] = useState<any>('');
	const return_avatar = data.avatar;
	const avatar = state.selectedAvatar ? state.selectedAvatar : return_avatar;
	const MAX_IMAGE_SIZE = 80000; //80kb
	const [formData, setFormData] = useState<FormData>({
		name: "",
		bio: "",
	});


	useEffect(() => {
		const fetchData = async () => {
			try {
			const fetchedUserData = await getUser();
			setdata(fetchedUserData);
			} catch (error) {
			console.log('Error:', error);
			}
		};
		if (!data) {
			fetchData();
		}
		}, [data]);

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
		await updateUser({ bio: formData.bio,  avatar: avatar, username: formData.name, location: state.name_countrie}, {error: dispatch,first: setShowFirstComponent,second: setShowSecondComponent,tree: state.error_user, for: state.ErrorBio});
	};

	return (
	<div className="w-[378px] h-[675px] bg-white absolute z-[100] mr-[30%] rounded-[15px]
							phone:w-[250px] phone:h-[450px] phone:mr-0 phone:mt-[50%]
							Large-phone:w-[270px] Large-phone:h-[510px] Large-phone:mr-0 Large-phone:mt-[50%]
							laptop:w-[358px] laptop:h-[550px]
							desktop:w-[378px] desktop:h-[575px]">

		
		<Img_profile state={state} avatar={avatar} data={data}/>
		<Chose_img avatar={avatar} return_avatar={return_avatar} handleAvatarSelection={handleAvatarSelection}/>
		<Uplode_img handleImageUpload={handleImageUpload}/>

		<form onSubmit={handleSubmit} className="w-full h-[291px]  flex flex-col justify-around items-center mt-[10px] phone:h-[260px] phone:mt-[-5px] Large-phone:h-[260px] desktop:h-[260px] laptop:h-[285px] laptop:mt-0 desktop:mt-0 ">
				<UsernameInput handleFormChange={handleFormChange} data={data} errormssage={state.errormssage} dispatch={dispatch}/>
				<Bioinpute handleFormChange={handleFormChange}  dispatch={dispatch}/>
				<div className="ml-[30px]">
					<label htmlFor="tree" className="text-[12px] font-[400] phone:text-[9px] Large-phone:text-[10px] laptop:text-[10px]">{getText("LOCATION")}<span className='text-orange'> *</span></label>
					<CountryDropdown dispatch={dispatch} />
				</div>

				<div>
					<button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
					type={"submit"}
					className={`w-[222px] h-[40px] relative bg-[#00DAEA] mt-[15px] rounded-[10px] border-current  border-2 border-b-[4px] phone:w-[180px] phone:mt-[5px] phone:h-[30px] Large-phone:w-[180px] Large-phone:h-[30px]`}>
					<AiOutlineArrowRight
					color="black"
					className={`absolute bottom-[25%] right-[30px] transform transition-transform duration-700 ${state.isHover ? 'translate-x-[5px]' : '' }
								phone:bottom-[12%] phone:right-[30px] phone:w-[12px]
								Large-phone:bottom-[12%] Large-phone:right-[30px] Large-phone:w-[12px]
								laptop:bottom-[25%] laptop:right-[30px]
								desktop:bottom-[20%]`}
					/>
					<h1 className={`text-black  text-[14px] font-sora font-[700] tracking-[0.02em]
										phone:text-[10px] phone:p-[5px] Large-phone:text-[10px] Large-phone:p-[5px]`}>

							{getText("GO")}
							</h1>
					</button>
				</div>
				<Skip_link/>
		</form>
	</div>
	);
	};

	export default Sign_up_page;
