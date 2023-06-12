import React from 'react'

export interface DataState {
	selectedAvatar: string;
	errorLargeimg: boolean;
	ErrorBio: boolean;
	isHover: boolean;
	name_countrie: string;
	error_user: boolean;
	errormssage: string;
  }

export const DATA: DataState = {
	selectedAvatar: "",
	errorLargeimg: false,
	ErrorBio: true,
	isHover: false,
	name_countrie: "",
	error_user: true,
	errormssage: "",
}

export const postReduser = (state: DataState, action: any): DataState =>
{
	switch (action.type)
	{
		case "ERROR_BIO":
		return {
			...state,
			ErrorBio: action.pyload,
		}
		case "SELECTED_AVATAR":
			return {
				...state,
				selectedAvatar: action.pyload,
			}
		case "ERROR_LARGEIMG":
			return {
				...state,
				errorLargeimg: action.pyload,
			}
		case "ISHOVER":
			return {
				...state,
				isHover: action.pyload,
			}
		case "NAME_COUNTRIE":
			return {
				...state,
				name_countrie: action.pyload,
			}
		case "ERROR_USER":
			return {
				...state,
				error_user: action.pyload,
			}
		case "ERROR_MESSAGE":
			return {
				...state,
				errormssage: action.pyload,
			}
		default:
      		return state;
	}
}