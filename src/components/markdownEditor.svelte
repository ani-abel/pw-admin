<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Editor } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';
	import mediumZoom from '@bytemd/plugin-medium-zoom';
	import math from '@bytemd/plugin-math-ssr';
	import pluginBreaks from '@bytemd/plugin-breaks';
	import 'bytemd/dist/index.css';

	const dispatch = createEventDispatcher();
	let value = '';
	const plugins = [gfm(), highlight(), mediumZoom(), math(), pluginBreaks()];

	const handleChange = (event: any) => {
		value = event.detail.value;
		dispatch('markdownContent', value);
	};

	const uploadImages = (file: File[]) => {
		console.log({ file });
		// Handle file upload here
	};
</script>

<Editor
	placeholder="Write your article 🖍"
	{uploadImages}
	{value}
	{plugins}
	on:change={handleChange}
/>
