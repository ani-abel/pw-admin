<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Table,
		Row,
		Col,
		Pagination,
		PaginationItem,
		PaginationLink,
		Card,
		Icon,
		CardBody,
		CardFooter,
		DropdownItem,
		DropdownMenu,
		Dropdown,
		DropdownToggle
	} from 'sveltestrap';
	import { fillArray, formatDate, httpGet, httpPatch } from '../../../utils/function.util';
	import { API_BASE_URL } from '../../../utils/const.util';
	import type { BaseResponseTypeDTO } from '../../../utils/type.util';

	export let data;
	let messages: any[] = [];
	let paginationControl: any;
	let fullPaginationList: any;
	let selectedPage = 1;

	onMount(() => {
		if (data) {
			paginationControl = (data as any)?.paginationControl;
			fullPaginationList = fillArray(paginationControl.totalPages);
			messages = (data as any).data;
		}
	});

	const navigate = async (e: Event, page: number) => {
		e.preventDefault();
		const response = await httpGet<any>(
			`${API_BASE_URL}/contact-message?pageNumber=${page}&pageSize=10`
		);
		messages = response.data;
		selectedPage = page;
	};

	const markAsRead = async (e: Event, messageId: string) => {
		e.preventDefault();
		const response = await httpPatch<BaseResponseTypeDTO<any>, any>(
			`${API_BASE_URL}/contact-message`,
			{
				contactMessageId: messageId,
				status: false
			}
		);
		if (response.success) {
			window.location.reload();
		}
	};
</script>

<Row class="pt-50">
	<Col xs="12" sm={{ offset: 1, size: 10 }} md={{ offset: 1, size: 10 }}>
		<Card class="bg-black">
			<CardBody>
				<Table dark>
					<thead>
						<tr>
							<th>#</th>
							<th>Sender</th>
							<th>Message</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Date Written</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each messages as message, index}
							<tr>
								<!-- svelte-ignore a11y-misplaced-scope -->
								<td scope="row">{index + 1}</td>
								<td>{message.name}</td>
								<td>
									<p>{message.message}</p>
								</td>
								<td>{message.email}</td>
								<td>{message.phoneNumber}</td>
								<td>{formatDate(message.dateCreated, 'DATE')}</td>
								<td>
									<Dropdown autoClose={true}>
										<DropdownToggle>
											<Icon name="three-dots-vertical" />
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem
												class="cursor-pointer"
												on:click={(e) => markAsRead(e, message.id)}>Mark as read</DropdownItem
											>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			</CardBody>
			{#if paginationControl}
				<CardFooter>
					<Pagination class="justify-content-center" size="md">
						<PaginationItem>
							<PaginationLink first on:click={(e) => navigate(e, fullPaginationList[0])} />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								previous
								on:click={(e) => navigate(e, selectedPage <= 1 ? 1 : selectedPage - 1)}
							/>
						</PaginationItem>
						{#each fullPaginationList as pageNumber}
							<PaginationItem>
								<PaginationLink on:click={(e) => navigate(e, pageNumber)}
									>{pageNumber}</PaginationLink
								>
							</PaginationItem>
						{/each}
						<PaginationItem>
							<PaginationLink
								next
								on:click={(e) =>
									navigate(
										e,
										selectedPage >= fullPaginationList[fullPaginationList.length - 1]
											? fullPaginationList[fullPaginationList.length - 1]
											: selectedPage + 1
									)}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								last
								on:click={(e) => navigate(e, fullPaginationList[fullPaginationList.length - 1])}
							/>
						</PaginationItem>
					</Pagination>
				</CardFooter>
			{/if}
		</Card>
	</Col>
</Row>

<style></style>
