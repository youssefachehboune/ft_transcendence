import { FormControl, FormHelperText } from "@chakra-ui/react";
import { BsCameraFill } from "react-icons/bs";

function Uplode_chanel_img({handleClick, handleImageUpload, large_img, avatarchanel, fileInputRef}: any) {
    return ( 
        <FormControl>
        <div className="w-[100%] h-[170px] flex items-center justify-center">
              <div onClick={handleClick} className={`w-[120px] h-[120px] flex items-center justify-center rounded-full ${avatarchanel ? "" : "border-black border-[7px] border-dashed"}  cursor-pointer`}>
                <input
                onChange={handleImageUpload}
                  ref={fileInputRef}
                  id="file-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                {avatarchanel && <img src={avatarchanel} alt="" className="w-[full] h-full rounded-full"/>}
                {!avatarchanel && <BsCameraFill className="w-[40px] h-[40px]"/>}
              </div>
        </div>
        {large_img ? 
              (
                <h1 className="text-[12px] text-[red] text-center">{large_img}</h1>
              ) : (
              <FormHelperText textAlign={'center'}>
                      you must Uplode Img
              </FormHelperText>
              )
        }
      </FormControl>
     );
}

export default Uplode_chanel_img;