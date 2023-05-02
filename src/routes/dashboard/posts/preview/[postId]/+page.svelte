<script lang="ts">
	import { onMount } from 'svelte';
	import { Row, Col, Card, CardBody, CardHeader } from 'sveltestrap';
	import MarkdownViewer from '../../../../../components/markdownViewer.svelte';

	export let data: any;
	let value: string;

	onMount(() => {
		value = data.data.body;
	});
</script>

<Row class="pt-50">
	<Col xs="12" sm="12" md={{ offset: 2, size: 8 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">{data.data.title}</h2>
			</CardHeader>
			<CardBody>
				<MarkdownViewer {value} />
			</CardBody>
		</Card>
	</Col>
</Row>
