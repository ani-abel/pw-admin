import type { AppRole } from './const.util';

export type FormDataType = {
	[key: string]: { value: any; required: boolean };
};

export class ErrorMetaType {
	color!: string;
	header!: string;
	message!: string;
}

export class BaseResponseTypeDTO<T> {
	success!: boolean;
	code!: number;
	message!: string;
	data?: T;
}

export abstract class Base {
	id!: string;
	status!: boolean;
	dateCreated!: Date;
	dateUpdate!: Date;
}

export class User extends Base {
	email!: string;
	phoneNumber!: string;
	role!: AppRole;
	uniqueVerificationCode!: string;
	profileImageUrl!: string;

	// postsCreatedByThisUser: Post[];
}

export class AuthResponse {
	userId!: string;
	email!: string;
	role!: AppRole;
	dateCreated!: Date;
	token!: string;
	tokenInitializationDate!: number;
	tokenExpiryDate!: number;
	user!: User;
}

export class AuthResponseDTO extends BaseResponseTypeDTO<AuthResponse> {}

export class NotificationMetaType {
	message!: string;
	color!: string;
	header!: string;
}

export class PaginationResponseType {
	currentPage!: number;
	totalPages!: number;
	pageSize!: number;
	totalCount!: number;
	hasPrevious!: boolean;
	hasNext!: boolean;
}

export class Series extends Base {
	name!: string;

	// postsInThisSeries: Post[];
}

export class SeriesItemResponseDTO extends BaseResponseTypeDTO<Series> {}

export class SeriesResponseDTO extends BaseResponseTypeDTO<Series> {
	paginationControl?: PaginationResponseType;
}
