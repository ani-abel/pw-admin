import { API_BASE_URL } from '../../../utils/const.util.js';
import { httpGet } from '../../../utils/function.util.js';

export async function load({ url }) {
	return await httpGet(`${API_BASE_URL}/post?pageNumber=1&pageSize=10`);
}
