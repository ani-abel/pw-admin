<script lang="ts">
	import { onMount } from 'svelte';

	export let url: string;
	export let fileName: string;
	let fileExtension = 'mp4';

	onMount(async () => {
		if (typeof fileName !== 'undefined' && fileName) {
			fileExtension = fileName.split('.').pop() ?? 'mp4';
		}
	});
</script>

<div class="image-preview text-center">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video width="100" height="100" controls>
		<source src={url} type={`video/${fileExtension}`} />
		Your browser does not support the video element.
	</video>
</div>
