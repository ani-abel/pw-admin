<script lang="ts">
	import { Row, Col, Card, CardBody, CardHeader } from 'sveltestrap';
	import MarkdownViewer from '../../../../../components/markdownViewer.svelte';

	const value = `
## Markdown Basic Syntax

I just love **bold text**. Italicized text is the _cat's meow_. At the command prompt, type.

My favorite markdown editor is [ByteMD](https://github.com/bytedance/bytemd).

1. First item
2. Second item
3. Third item

> Dorothy followed her through many of the beautiful rooms in her castle.`;
</script>

<Row class="pt-50">
	<Col xs="12" sm="12" md={{ offset: 2, size: 8 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">Article Title</h2>
			</CardHeader>
			<CardBody>
				<MarkdownViewer {value} />
			</CardBody>
		</Card>
	</Col>
</Row>
