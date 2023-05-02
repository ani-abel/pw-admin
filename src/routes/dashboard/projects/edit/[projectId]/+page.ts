import { API_BASE_URL, httpGet } from '../../../../../utils';

export async function load({ params }) {
	return await httpGet(`${API_BASE_URL}/project/${params.projectId}`);
}
