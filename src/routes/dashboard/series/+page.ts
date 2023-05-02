import { type BaseResponseTypeDTO, type Series, httpGet, API_BASE_URL } from '../../../utils';

export async function load({ url }) {
	return await httpGet<BaseResponseTypeDTO<Series[]>>(
		`${API_BASE_URL}/series?pageNumber=1&pageSize=10`
	);
}
