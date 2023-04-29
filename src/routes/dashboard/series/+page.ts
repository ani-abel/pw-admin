import type { BaseResponseTypeDTO, Series } from 'src/utils/type.util';
import { API_BASE_URL } from '../../../utils/const.util';
import { httpGet } from '../../../utils/function.util';

export async function load({ url }) {
	const res = await httpGet<BaseResponseTypeDTO<Series[]>>(
		`${API_BASE_URL}/series?pageNumber=1&pageSize=10`
	);
	return { ...res };
}
