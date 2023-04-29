import { API_BASE_URL } from '../../../utils/const.util';
import { httpGet } from '../../../utils/function.util';

export async function load({ url }) {
	return await httpGet(`${API_BASE_URL}/project?pageNumber=1&pageSize=10`);
}
