import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { ErrorMetaType, FormDataType } from './type.util';

export const convertFilesToBase64Strings = async (event: Event): Promise<string[]> => {
	const base64Strings: string[] = [];
	const files: FileList = (event.target as HTMLInputElement).files as FileList;
	for (const file of files) {
		const filePath: string = await new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.onload = () => resolve(fileReader.result as string);
			fileReader.readAsDataURL(file);
		});
		base64Strings.push(filePath);
	}
	return base64Strings;
};

export const validateFormData = (formData: FormDataType): boolean => {
	const formFields = Object.keys(formData);
	const validatorArray = [];
	for (const key of formFields) {
		if (!formData[key].required) {
			validatorArray.push(true);
		} else {
			if (formData[key].value && typeof formData[key] !== 'undefined') {
				validatorArray.push(true);
			} else {
				validatorArray.push(false);
			}
		}
	}
	return validatorArray.every((item) => item === true);
};

export const httpGet = async <T>(url: string, headers = {}): Promise<T> => {
	const response: AxiosResponse = await axios.get(url, { headers });
	return response.data as T;
};

export const httpPost = async <U, T>(url: string, payload: T, headers = {}): Promise<U> => {
	const response: AxiosResponse = await axios.post(url, payload, { headers });
	return response.data as U;
};

export const httpPatch = async <U, T>(url: string, payload: T, headers = {}): Promise<U> => {
	const response: AxiosResponse = await axios.patch(url, payload, { headers });
	return response.data as U;
};

export const httpDelete = async <U>(url: string, headers = {}): Promise<U> => {
	const response: AxiosResponse = await axios.delete(url, { headers });
	return response.data as U;
};

export const extractAxiosError = (
	error: any,
	color: string,
	header: string
): ErrorMetaType | undefined => {
	if (typeof error !== 'undefined' && error instanceof AxiosError && error.response) {
		return {
			color,
			header,
			message: error.response.data.message
		};
	}
};

export const extractDataFromLocalStorage = (key: string) => localStorage.getItem(key);

export const formatDate = (dateString: string, type: 'TIME' | 'DATE'): string => {
	const date = new Date(dateString);
	if (type === 'DATE') {
		return date.toDateString();
	}
	if (type === 'TIME') {
		return date.toTimeString();
	}
};

export const fillArray = (length = 1): number[] => {
	const items = [];
	for (let i = 0; i < length; i++) {
		items.push(i + 1);
	}
	return items;
};
