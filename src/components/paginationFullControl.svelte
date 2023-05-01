<script lang="ts">
	import { CardFooter, PaginationItem, Pagination, PaginationLink } from 'sveltestrap';
	import type { NavigateFunction, PaginationResponseType } from '../utils/type.util';
	import { fillArray } from '../utils/function.util';

	export let selectedPage: number;
	export let navigate: NavigateFunction;
	export let paginationControl: PaginationResponseType;
	let fullPaginationList = fillArray(paginationControl.totalPages);

	const handleNavigateWrapper = (e: MouseEvent, page: number) => navigate(e, page);
</script>

<CardFooter>
	<Pagination class="justify-content-center" size="md">
		<PaginationItem>
			<PaginationLink first on:click={(e) => handleNavigateWrapper(e, fullPaginationList[0])} />
		</PaginationItem>
		<PaginationItem>
			<PaginationLink
				previous
				on:click={(e) => handleNavigateWrapper(e, selectedPage <= 1 ? 1 : selectedPage - 1)}
			/>
		</PaginationItem>
		{#each fullPaginationList as pageNumber}
			<PaginationItem>
				<PaginationLink on:click={(e) => handleNavigateWrapper(e, pageNumber)}
					>{pageNumber}</PaginationLink
				>
			</PaginationItem>
		{/each}
		<PaginationItem>
			<PaginationLink
				next
				on:click={(e) =>
					handleNavigateWrapper(
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
				on:click={(e) =>
					handleNavigateWrapper(e, fullPaginationList[fullPaginationList.length - 1])}
			/>
		</PaginationItem>
	</Pagination>
</CardFooter>
