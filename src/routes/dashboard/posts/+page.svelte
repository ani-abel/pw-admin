<script lang="ts">
	import type { BaseResponseTypeDTO } from '../../../utils/type.util';
	import PaginationFullControl from '../../../components/paginationFullControl.svelte';
	import { API_BASE_URL, PostStatus } from '../../../utils/const.util';
	import {
		extractDataFromLocalStorage,
		fillArray,
		formatDate,
		httpDelete,
		httpGet,
		httpPost
	} from '../../../utils/function.util';
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

	export let data: any;
	let posts: any[] = [];
	let paginationControl: any;
	let fullPaginationList: any;
	let selectedPage = 1;
	let jwtToken: string | null;

	onMount(() => {
		if (data) {
			paginationControl = (data as any)?.paginationControl;
			fullPaginationList = fillArray(paginationControl.totalPages);
			posts = (data as any).data;
			jwtToken = extractDataFromLocalStorage('token');
		}
	});

	const navigate = async (e: Event, page: number) => {
		e.preventDefault();
		const response = await httpGet<any>(`${API_BASE_URL}/post?pageNumber=${page}&pageSize=10`);
		posts = response.data;
		selectedPage = page;
	};

	const findTags = (post: any) =>
		(post.tagsForThisPost as any[]).map(({ tag }) => tag.name).join(', ');

	const publishArticleLocally = async (
		e: Event,
		postId: string,
		postStatus = PostStatus.PUBLISHED
	) => {
		e.preventDefault();
		const response = await httpPost<BaseResponseTypeDTO<any>, any>(
			`${API_BASE_URL}/post/publish-post/locally`,
			{ postId, postStatus },
			{ Authorization: `Bearer ${jwtToken}` }
		);
		if (response.success) {
			window.location.reload();
		}
	};

	const publishArticle = async (e: Event, postId: string, postStatus = PostStatus.PUBLISHED) => {
		e.preventDefault();
		const response = await httpPost<BaseResponseTypeDTO<any>, any>(
			`${API_BASE_URL}/post/publish-post`,
			{ postId, postStatus },
			{ Authorization: `Bearer ${jwtToken}` }
		);
		if (response.success) {
			window.location.reload();
		}
	};

	const deleteArticle = async (e: Event, postId: string) => {
		e.preventDefault();
		const response = await httpDelete<BaseResponseTypeDTO<any>>(`${API_BASE_URL}/post/${postId}`, {
			Authorization: `Bearer ${jwtToken}`
		});
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
					<a href="/dashboard/posts/add" class="btn btn-danger">Add</a>
				</div>
			</CardHeader>
			<CardBody>
				<Table dark>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Tags</th>
							<th>Series</th>
							<th>Date Written</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each posts as post, index}
							<tr>
								<!-- svelte-ignore a11y-misplaced-scope -->
								<td scope="row">{index + 1}</td>
								<td>{post.title}</td>
								<td>{findTags(post)}</td>
								{#if post.series}
									<td>
										<a href="/dashboard/series/edit/{post.series.id}">
											{post.series.name}
										</a>
									</td>
								{:else}
									<td>None</td>
								{/if}
								<td>{formatDate(post.dateCreated, 'DATE')}</td>
								<td>
									<Dropdown autoClose={true}>
										<DropdownToggle>
											<Icon name="three-dots-vertical" />
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem href="/dashboard/posts/preview/{post.id}">Preview</DropdownItem>
											<DropdownItem href="/dashboard/posts/edit/{post.id}">Edit</DropdownItem>
											{#if post.postStatus === PostStatus.DRAFT}
												<DropdownItem on:click={(e) => publishArticleLocally(e, post.id)}
													>Publish (Locally only)
												</DropdownItem>
											{:else}
												<DropdownItem
													on:click={(e) => publishArticleLocally(e, post.id, PostStatus.PUBLISHED)}
													>Unpublish (Locally only)
												</DropdownItem>
											{/if}

											{#if post.postStatus === PostStatus.DRAFT}
												<DropdownItem on:click={(e) => publishArticle(e, post.id)}
													>Publish
												</DropdownItem>
											{:else}
												<DropdownItem
													on:click={(e) => publishArticle(e, post.id, PostStatus.PUBLISHED)}
													>UnPublish
												</DropdownItem>
											{/if}
											<DropdownItem on:click={(e) => deleteArticle(e, post.id)}
												>Delete
											</DropdownItem>
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
