import { API_BASE_URL } from '../../../utils';
import { httpGet } from '../../../utils';
import type { PageLoadEvent } from './$types';

export async function load({ url }: PageLoadEvent) {
	return await httpGet(`${API_BASE_URL}/contact-message?pageNumber=1&pageSize=10`);
}
