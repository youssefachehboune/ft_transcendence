import { ChangeEvent, Dispatch, useReducer, useState } from 'react';


interface bio
{
	handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
	dispatch: Dispatch<any>;
}
const Bioinpute = ({ handleFormChange, dispatch} : bio) => {

	const [username, setUsername] = useState('');
	const [error, setError] = useState('');
	const error_Bio_max_charcterc  = "Bio can contain 200 characters maximum"
	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 200) {
		setUsername(value.substring(0, 201));
		setError(error_Bio_max_charcterc);
		dispatch({type: "ERROR_BIO", pyload: false})
	  } 
	  else {
		  setUsername(value);
		  setError('');
		  dispatch({type: "ERROR_BIO", pyload: true})
	}
    handleFormChange(e);
  };

  return (
	<div className="ml-[30px]">
	<label
	htmlFor="tow"
	className=" text-[12px] font-[400] font-sora  phone:text-[9px] phone:mr-[80px] Large-phone:text-[10px] laptop:text-[10px]"
	>
	Tell us a little about yourself
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
