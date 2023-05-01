<script lang="ts">
	import type { BaseResponseTypeDTO } from '../../../utils/type.util';
	import { API_BASE_URL } from '../../../utils/const.util';
	import {
		extractDataFromLocalStorage,
		fillArray,
		formatDate,
		httpDelete,
		httpGet,
		httpPatch
	} from '../../../utils/function.util';
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
		CardHeader,
		DropdownItem,
		DropdownMenu,
		Dropdown,
		DropdownToggle
	} from 'sveltestrap';

	export let data: any;
	let projects: any[] = [];
	let paginationControl: any;
	let fullPaginationList: any;
	let selectedPage = 1;

	onMount(() => {
		if (data) {
			paginationControl = (data as any)?.paginationControl;
			fullPaginationList = fillArray(paginationControl.totalPages);
			projects = (data as any).data;
		}
	});

	const navigate = async (e: Event, page: number) => {
		e.preventDefault();
		const response = await httpGet<any>(`${API_BASE_URL}/project?pageNumber=${page}&pageSize=10`);
		projects = response.data;
		selectedPage = page;
	};

	const deleteProject = async (e: Event, projectId: string) => {
		e.preventDefault();
		const token = extractDataFromLocalStorage('token');
		const response = await httpDelete<BaseResponseTypeDTO<any>>(
			`${API_BASE_URL}/project/${projectId}`,
			{ Authorization: `Bearer ${token}` }
		);
		if (response.success) {
			window.location.reload();
		}
	};

	const updateProject = async (e: Event, projectId: string, status = true) => {
		e.preventDefault();
		const token = extractDataFromLocalStorage('token');
		const response = await httpPatch<BaseResponseTypeDTO<any>, any>(
			`${API_BASE_URL}/project`,
			{
				projectId,
				status
			},
			{ Authorization: `Bearer ${token}` }
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
					<a href="/dashboard/projects/add" class="btn btn-danger">Add</a>
				</div>
			</CardHeader>
			<CardBody>
				<Table dark>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>Date Written</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each projects as project, index}
							<tr class={!project.status ? 'greyedOut' : ''}>
								<th scope="row">{index + 1}</th>
								<td>{project.title}</td>
								<td>{project.description}</td>
								<td>{formatDate(project.dateCreated, 'DATE')}</td>
								<td>
									<Dropdown autoClose={true}>
										<DropdownToggle>
											<Icon name="three-dots-vertical" />
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem href="/dashboard/projects/edit/{project.id}">Edit</DropdownItem>
											<DropdownItem
												class="cursor-pointer"
												on:click={(e) => deleteProject(e, project.id)}
											>
												Delete
											</DropdownItem>
											{#if !project.status}
												<DropdownItem
													class="cursor-pointer"
													on:click={(e) => updateProject(e, project.id)}
												>
													Activate
												</DropdownItem>
											{:else}
												<DropdownItem
													class="cursor-pointer"
													on:click={(e) => updateProject(e, project.id, false)}
												>
													Deactivate
												</DropdownItem>
											{/if}
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
