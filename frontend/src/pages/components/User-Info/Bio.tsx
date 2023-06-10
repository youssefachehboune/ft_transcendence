import { ChangeEvent, useState } from 'react';
import { getText } from '@/pages/api/lang';
const Bioinpute = ({ handleFormChange, getText, setErrorBio} : any) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const error_Bio_alphanumeric = getText('BIOALPHANUMERIC')
  const error_Bio_max_charcterc  = getText('BIOMAXCARACTER')
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 200) {
		setUsername(value.substring(0, 200));
		setError(error_Bio_max_charcterc);
		setErrorBio(false);
	  } else {
		let containsNonAlphanumeric = false;
		for (let i = 0; i < value.length; i++) {
		  const charCode = value.charCodeAt(i);
		  if (
			!(charCode >= 48 && charCode <= 57) && // 0-9
			!(charCode >= 65 && charCode <= 90) && // A-Z
			!(charCode >= 97 && charCode <= 122) // a-z
		  ) {
			containsNonAlphanumeric = true;
			break;
		  }
		}
  
		if (containsNonAlphanumeric) {
		  setUsername(value);
		  setError(error_Bio_alphanumeric);
		  setErrorBio(false);
		} else {
		  setUsername(value);
		  setError('');
		  setErrorBio(true); 
		}
	  }
    handleFormChange(e);
  };

  return (
	<div className="ml-[30px]">
	<label
	htmlFor="tow"
	className=" text-[10px] font-[400] font-sora  phone:text-[9px] phone:mr-[80px] Large-phone:text-[10px] laptop:text-[10px]"
	>
	{getText("BIO")}
	<span className='text-orange'> *</span>
	</label>
	<input
	id="tow"
	onChange={handleUsernameChange}
	value={username}
	name="bio"
	type="text"
	className="w-[305px] h-[31px] border-current border-2  text-[12px] rounded-full p-[15px] phone:w-[200px] phone:h-[30px] phone:text-[10px] Large-phone:w-[220px] Large-phone:h-[40px] Large-phone:text-[10px] laptop:h-[40px]"
	required
	style={{ borderColor: !error ? 'black' : 'red' }}
	/>
    {error && <p className="text-red-500 text-[10px] phone:text-[7px] Large-phone:text-[8px]">{error}</p>}
    </div>
  );
};

export default Bioinpute;
