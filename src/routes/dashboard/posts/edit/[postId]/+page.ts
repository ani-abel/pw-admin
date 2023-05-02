import { API_BASE_URL } from '../../../../../utils/const.util';
import { httpGet } from '../../../../../utils/function.util';

export async function load({ params }) {
	const post = await httpGet(`${API_BASE_URL}/post/${params.postId}`);
	const tags = await httpGet(`${API_BASE_URL}/tag`);
	const series = await httpGet(`${API_BASE_URL}/series`);
	return { post, tags, series };
}
