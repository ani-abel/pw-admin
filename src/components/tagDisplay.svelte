<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let preDisplayedTags: string[] = [];
	export let label: string = 'Tags';
	export let tags: any[];
	export let selectedTags: string[] = [];

	const dispatch = createEventDispatcher();

	onMount(() => {
		selectedTags = [...preDisplayedTags];
	});

	const selectTag = (event: any): void => {
		const element = event.target;
		const attr = element.getAttribute('data-value');
		if (attr) {
			if (selectedTags.includes(attr)) {
				selectedTags = selectedTags.filter((tag) => tag !== attr);
				element.classList.remove('active');
			} else {
				selectedTags.push(attr);
				element.classList.add('active');
			}
		}
		dispatch('selectTags', selectedTags);
	};
</script>

<h4 class="text-white">{label}</h4>
<div class="grid-container">
	{#each tags as tag}
		<div
			on:click={selectTag}
			on:keypress={selectTag}
			data-value={tag.name}
			class:active={selectedTags.includes(tag.name)}
			class="cursor-pointer text-white item"
		>
			{tag.name}
		</div>
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, 25%);
		grid-template-rows: repeat(auto-fill, 50%);
		border: 1px solid #0e0e10;
		height: 250px;
		overflow-y: scroll;
	}

	.item {
		padding: 20px 7px;
		background: #0e0e10;
		border: 1px solid #030314;
		font-size: 14px;
	}

	.active,
	.item:hover {
		background: #32d2f2 !important;
		color: #000 !important;
	}

	@media (max-width: 576px) {
		.grid-container {
			grid-template-columns: repeat(auto-fill, 100%);
			grid-template-rows: repeat(auto-fill, 20%);
		}

		.item {
			padding: 10px 7px;
		}
	}
</style>
