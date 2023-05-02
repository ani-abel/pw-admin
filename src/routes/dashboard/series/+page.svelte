<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Table,
		Row,
		Col,
		Card,
		Icon,
		CardBody,
		CardHeader,
		DropdownItem,
		DropdownMenu,
		Dropdown,
		DropdownToggle
	} from 'sveltestrap';
	import PaginationFullControl from '../../../components/paginationFullControl.svelte';
	import {
		type BaseResponseTypeDTO,
		API_BASE_URL,
		fillArray,
		formatDate,
		httpDelete,
		httpGet
	} from '../../../utils';

	export let data: any;
	let series: any[] = [];
	let paginationControl: any;
	let fullPaginationList: any;
	let selectedPage = 1;

	onMount(() => {
		if (data) {
			paginationControl = (data as any)?.paginationControl;
			fullPaginationList = fillArray(paginationControl.totalPages);
			series = (data as any).data;
		}
	});

	const navigate = async (e: Event, page: number) => {
		e.preventDefault();
		const response = await httpGet<any>(`${API_BASE_URL}/series?pageNumber=${page}&pageSize=10`);
		series = response.data;
		selectedPage = page;
	};

	const deleteSeries = async (e: Event, seriesId: string) => {
		e.preventDefault();
		const response = await httpDelete<BaseResponseTypeDTO<any>>(
			`${API_BASE_URL}/series/${seriesId}`
		);
		if (response.success) {
			window.location.reload();
		}
	};
</script>

<Row class="pt-50">
	<Col xs="12" sm={{ offset: 1, size: 10 }} md={{ offset: 1, size: 10 }}>
		<Card class="bg-black">
			<CardHeader>
				<div class="full-screen text-right p-10">
					<a href="/dashboard/series/add" class="btn btn-danger">Add</a>
				</div>
			</CardHeader>
			<CardBody>
				<Table dark>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Articles</th>
							<th>Date Created</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each series as item, index}
							<tr>
								<th scope="row">{index + 1}</th>
								<td>{item.name}</td>
								{#if item.postsInThisSeries?.length > 0}
									<td>
										<ul>
											{#each item.postsInThisSeries as post}
												<li>{post.title}</li>
											{/each}
										</ul>
									</td>
								{:else}
									<td>None</td>
								{/if}
								<td>{formatDate(item.dateCreated, 'DATE')}</td>
								<td>
									<Dropdown autoClose={true}>
										<DropdownToggle>
											<Icon name="three-dots-vertical" />
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem href="/dashboard/series/edit/{item.id}">Edit</DropdownItem>
											<DropdownItem
												class="cursor-pointer"
												on:click={(e) => deleteSeries(e, item.id)}>Delete</DropdownItem
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
				<PaginationFullControl {paginationControl} {selectedPage} {navigate} />
			{/if}
		</Card>
	</Col>
</Row>

<style></style>
