<script lang="ts">
	import { Viewer } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';
	import mediumZoom from '@bytemd/plugin-medium-zoom';
	import math from '@bytemd/plugin-math-ssr';
	import pluginBreaks from '@bytemd/plugin-breaks';
	import 'bytemd/dist/index.css';

	export let value: string;

	const plugins = [gfm(), highlight(), mediumZoom(), math(), pluginBreaks()];
</script>

<Viewer {value} {plugins} />
