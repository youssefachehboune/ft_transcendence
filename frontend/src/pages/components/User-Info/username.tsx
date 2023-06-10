import { ChangeEvent, useState } from 'react';
import { getText } from '@/pages/api/lang';
const UsernameInput = ({ handleFormChange, data, getText, errormssage, seterrormssage, seterroruser} : any) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const error_user_alredy_exist = getText('USERALREDYEXIST');
  const error_user_alphanumeric = getText('USERALPHANUMERIC')
  const error_user_max_charcter  = getText('USERMAXCARACTER')
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
	seterrormssage('')
    if (value.length > 15) {
		setUsername(value.substring(0, 15));
		setError( error_user_max_charcter);
		seterroruser(false);
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
		  setError(error_user_alphanumeric);
		  seterroruser(false);
		} else {
		  setUsername(value);
		  setError('');
		  seterroruser(true); 
		}
	  }
    handleFormChange(e);
  };

  return (
    <div className="ml-[30px]">
      <label
        htmlFor="one"
        className="text-[10px] font-sora font-[400] phone:text-[9px] Large-phone:text-[10px] laptop:text-[10px]"
      >
        {getText('USERNAME')}
		<span className='text-orange'> *</span>
      </label>
      <input
        id="one"
        onChange={handleUsernameChange}
        name="name"
        placeholder={data.username}
        type="text"
        value={username}
        className="w-[305px] h-[31px] text-[12px] border-current border-2 rounded-full p-[15px] phone:w-[200px] phone:h-[20px] phone:text-[10px] Large-phone:w-[220px] Large-phone:h-[40px] Large-phone:text-[10px] laptop:h-[40px] laptop:text-[15px]"
        required
        style={{ borderColor: !error ? 'black' : 'red' }}
      />
      {error && <p className="text-red-500 text-[10px] phone:text-[7px] Large-phone:text-[8px]">{error}</p>}
	  {errormssage && (
			<p className="text-red-500 text-[10px] phone:text-[7px] Large-phone:text-[8px]">{error_user_alredy_exist}</p>
			)}
    </div>
  );
};

export default UsernameInput;
