<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Editor } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';
	import mediumZoom from '@bytemd/plugin-medium-zoom';
	import pluginFileUpload from 'bytemd-plugin-file-upload';
	import pluginFileLocales from 'bytemd-plugin-file-upload/locales/zh_Hans.json';
	import math from '@bytemd/plugin-math-ssr';
	import pluginBreaks from '@bytemd/plugin-breaks';
	import 'bytemd/dist/index.css';
	import { uploadFiles } from '../utils/function.util';
	import type { MarkdownFileUploaderType } from '../utils/type.util';

	const uploadImages = async (files: File[]): Promise<MarkdownFileUploaderType[]> => {
		const { data: links } = await uploadFiles(files);
		return links.map((link, index) => ({
			url: link,
			alt: files[index].name,
			title: files[index].name
		}));
	};

	const handleChange = (event: any) => {
		value = event.detail.value;
		dispatch('markdownContent', value);
	};

	const dispatch = createEventDispatcher();
	export let value: string = '';
	const plugins = [
		gfm(),
		highlight(),
		mediumZoom(),
		math(),
		pluginBreaks(),
		pluginFileUpload({ locale: pluginFileLocales, uploadFile: uploadImages })
	];
</script>

<Editor
	placeholder="Write your article 🖍"
	{uploadImages}
	{value}
	{plugins}
	on:change={handleChange}
/>
