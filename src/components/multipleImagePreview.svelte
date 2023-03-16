<script lang="ts">
	import { Image } from 'sveltestrap';

	export let urls: string[];
</script>

<div class="grid-container">
	{#each urls as url}
		<div class="item cursor-pointer text-white">
			<Image alt="Image preview" class="full-width full-height" src={url} />
		</div>
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, 25%);
		grid-template-rows: repeat(auto-fill, 50%);
		border: 1px solid #0e0e10;
	}

	.item {
		padding: 5px;
		background: #0e0e10;
		border: 1px solid #030314;
	}

	@media (max-width: 576px) {
		.grid-container {
			grid-template-columns: repeat(auto-fill, 100%);
			grid-template-rows: repeat(auto-fill, 20%);
		}

		.item {
			padding: 5px;
		}
	}
</style>
