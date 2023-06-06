import Link from "next/link";
import { AiOutlineArrowRight, AiOutlineUpload } from "react-icons/ai";
import CountryDropdown from "./Country";
import { IoCamera } from "react-icons/io5";
import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { getText } from "../../api/lang";
import getUser from "../../api/user";
import Image from "next/image";
import updateUser from "@/pages/api/updateuser";

interface FormData {
  name: string;
  bio: string;
}

const Sign_up_page = () => {
  const [errormssage, seterrormssage] = useState<string>('');
  const return_avatar = getUser("avatar");
  const [name_countrie, setname_countrie] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const router = useRouter();
  const avatar = selectedAvatar ? selectedAvatar : return_avatar;
  const [formData, setFormData] = useState<FormData>({
	  name: "",
	  bio: "",
	});

  const handleAvatarSelection = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedAvatar(reader.result as string);
    };

    if (file) {
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
		
		updateUser({ bio: formData.bio });
		updateUser({ avatar: avatar });
		updateUser({ username: formData.name, hello: seterrormssage });
		updateUser({ location: name_countrie });

  };

  return (
    <div
      className="w-[378px] h-[675px] bg-white absolute z-[100] right-[55%] bottom-[20%] rounded-[20px]
							phone:w-[250px] phone:h-[420px] phone:right-[20%] phone:bottom-[10%]
							Large-phone:w-[270px] Large-phone:h-[500px] Large-phone:right-[30%] Large-phone:bottom-[10%]
							laptop:w-[358px] laptop:h-[540px] laptop:right-[40%] laptop:bottom-[5%]
							desktop:w-[378px] desktop:h-[575px] desktop:right-[50%] desktop:bottom-[10%]
						"
    >
      <div className="w-full h-[250px] flex items-center flex-col phone:h-[145px] Large-phone:h-[160px] desktop:h-[230px] laptop:h-[190px]">
        <h1 className="mt-[15px] font-sora text-[24px] font-[600] phone:text-[12px] Large-phone:text-[15px] desktop:text-[20px] laptop:text-[18px] ">
          {getText("HELLO")}{" "}
          <span className="text-[#00DAEA]">{getUser("firstName")}</span>
        </h1>
        <h1 className="font-sora text-[27px] font-[700] phone:text-[17px] Large-phone:text-[20px] laptop:text-[24px]">
          {getText("FINALIZE")}
        </h1>
        <div className="w-[130px] h-[130px] phone:w-[70px] phone:h-[70px] Large-phone:w-[80px] Large-phone:h-[80px] desktop:w-[120px]  desktop:h-[120px] laptop:w-[90px] laptop:h-[90px]">
          <img
            className="w-full h-full rounded-full border-[#00DAEA] border-[1.5px] mt-[10px]"
            src={avatar}
          />
        </div>
      </div>

      <div className="flex w-[220px] h-[70px] ml-[80px] justify-around items-center phone:w-[180px] phone:h-[35px] phone:ml-[35px] Large-phone:w-[180px] Large-phone:h-[40px] Large-phone:ml-[45px] laptop:h-[45px] laptop:w-[180px] laptop:ml-[90px] desktop:h-[50px]">
        <img
          src="test.svg"
          onClick={() => handleAvatarSelection("test.svg")}
          className="w-[32px] h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
          src="test-tree.svg"
          onClick={() => handleAvatarSelection("test-tree.svg")}
          className="w-[32px] h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
          src="test-one.svg"
          onClick={() => handleAvatarSelection("test-one.svg")}
          className="w-[32px] h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
          src="test-tow.svg"
          onClick={() => handleAvatarSelection("test-tow.svg")}
          className="w-[32px] h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
          src="test-tree.svg"
          onClick={() => handleAvatarSelection("test-tree.svg")}
          className="w-[32px] h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
      </div>

      <div className="flex justify-center h-[30px] desktop:h-[20px] laptop:h-[20px] Large-phone:h-[20px] phone:h-[15px]">
        <label
          htmlFor="file-input"
          className="text-[12px] mr-[7px] font-sora font-[500] cursor-pointer phone:text-[10px] laptop:text-[13px]  Large-phone:ml-[-10px] laptop:ml-[-15px]"
        >
          {getText("AVATAR")}
        </label>
        <input
          id="file-input"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <AiOutlineUpload className="mr-[-5px] phone:mr-0 Large-phone:mr-0 laptop:mr-0" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full h-[291px]  flex flex-col justify-around items-center mt-[10px] phone:h-[230px] phone:mt-[-5px] Large-phone:h-[260px] desktop:h-[260px] laptop:h-[275px] laptop:mt-0 desktop:mt-0 "
      >
        <div className="ml-[30px]">
          <label
            htmlFor="one"
            className="text-[10px] font-[400]  font-sora phone:text-[9px]  Large-phone:text-[10px] laptop:text-[10px]"
          >
            {getText("USERNAME")}
          </label>
          <input
            id="one"
            onChange={handleFormChange}
            name="name"
            placeholder={getUser("username")}
            type="text"
            className="w-[305px] h-[31px] text-[12px] border-current border-2 rounded-full p-[15px] phone:w-[200px] phone:h-[20px] phone:text-[10px] Large-phone:w-[220px] Large-phone:h-[40px] Large-phone:text-[10px]
																		laptop:h-[40px] laptop:text-[15px]"
            required
          	style={{borderColor: !errormssage ? 'black' : 'red'}}
			></input>
          {errormssage && (
            <p className="text-red-500 text-[10px]">{errormssage}</p>
          )}
        </div>

        <div className="ml-[30px]">
          <label
            htmlFor="tow"
            className=" text-[10px] font-[400] phone:text-[9px] phone:mr-[80px] Large-phone:text-[10px] laptop:text-[10px]"
          >
            {getText("BIO")}
          </label>
          <input
            id="tow"
            onChange={handleFormChange}
            name="bio"
            type="text"
            className="w-[305px] h-[31px] border-current border-2  text-[12px] rounded-full p-[15px] phone:w-[200px] phone:h-[30px] phone:text-[10px] Large-phone:w-[220px] Large-phone:h-[40px] Large-phone:text-[10px] laptop:h-[40px]"
            required
          />
        </div>

        <div className="ml-[30px]">
          <label
            htmlFor="tree"
            className="text-[10px] font-[400] phone:text-[9px] Large-phone:text-[10px] laptop:text-[10px]"
          >
            {getText("LOCATION")}
          </label>
          <CountryDropdown setcountriey={setname_countrie} />
        </div>

        <div>
          <button
            type={"submit"}
            className="w-[222px] h-[40px] relative bg-[#00DAEA] mt-[15px] rounded-[10px] border-current  border-2 border-b-[4px] phone:w-[180px] phone:mt-[5px] phone:h-[30px] Large-phone:w-[180px] Large-phone:h-[30px]"
          >
            <AiOutlineArrowRight
              color="black"
              className="absolute bottom-[25%] right-[30px] hover:mr-[-8px]
																			phone:bottom-[12%] phone:right-[30px] phone:w-[12px]
																			Large-phone:bottom-[12%] Large-phone:right-[30px] Large-phone:w-[12px]
																			laptop:bottom-[25%] laptop:right-[30px]
																			desktop:bottom-[20%]"
            />
            <h1 className="text-black  text-[14px] font-sora font-[700] tracking-[0.02em] phone:text-[10px] phone:p-[5px] Large-phone:text-[10px] Large-phone:p-[5px]">
              {getText("GO")}
            </h1>
          </button>
        </div>
        <Link
          href={"/2fa"}
          className="text-[#00DAEA] mb-[-10px] tracking-[0.02em]  text-[14px] font-ibm-plex-sans font-[600] phone:text-[10px] phone:mb-[5px] Large-phone:text-[10px] Large-phone:tracking-[0] desktop:mt-[5px]"
        >
          {getText("SKIP")}
        </Link>
      </form>
    </div>
  );
};

export default Sign_up_page;
