<script lang="ts">
	import { Figure, Image } from 'sveltestrap';

	export let url: string;
</script>

<div class="image-preview text-center">
	<Figure>
		<Image class="full-width" fluid alt="Uploaded image" src={url} />
	</Figure>
</div>
