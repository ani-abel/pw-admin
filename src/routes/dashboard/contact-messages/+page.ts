import { API_BASE_URL } from '../../../utils/const.util';
import { httpGet } from '../../../utils/function.util';
import type { PageLoadEvent } from './$types';

export async function load({ url }: PageLoadEvent) {
	return await httpGet(`${API_BASE_URL}/contact-message?pageNumber=1&pageSize=10`);
}
