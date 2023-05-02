import { API_BASE_URL } from '../../../../../utils/const.util';
import { httpGet } from '../../../../../utils/function.util';

export async function load({ params }) {
	return await httpGet(`${API_BASE_URL}/post/${params.postId}`);
}
