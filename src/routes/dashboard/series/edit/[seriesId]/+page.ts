import { API_BASE_URL } from '../../../../../utils/const.util';
import { httpGet } from '../../../../../utils/function.util';
import type { BaseResponseTypeDTO, Series } from '../../../../../utils/type.util';

export async function load({ params }) {
	const res = await httpGet<BaseResponseTypeDTO<Series>>(
		`${API_BASE_URL}/series/${params.seriesId}`
	);
	return { ...res };
}
