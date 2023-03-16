<script lang="ts">
	import {
		Row,
		Col,
		Card,
		Figure,
		Image,
		CardBody,
		Label,
		FormGroup,
		CardHeader,
		Input,
		Button,
		Form
	} from 'sveltestrap';
	import MarkdownEditor from '../../../../../components/markdownEditor.svelte';
	import TagDisplay from '../../../../../components/tagDisplay.svelte';
	import { convertFilesToBase64Strings } from '../../../../../utils/function.util';

	let selectedTags = [];
	let postBody;
	let coverImage: File;
	let imagePreviewInBase64Format: string;
	let isPartOfSeries = false;
	const toggleIsPartOfSeries = () => (isPartOfSeries = !isPartOfSeries);

	const handleMarkdownContent = (message: CustomEvent) => {
		console.log({ message: message.detail });
		postBody = message.detail;
	};

	const handleTagSelection = (message: CustomEvent) => {
		console.log({ tags: message.detail });
		selectedTags = message.detail;
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		console.log({ message: 'submitted' });
	};

	const uploadFiles = async (event: any) => {
		const [firstUrl] = await convertFilesToBase64Strings(event);
		imagePreviewInBase64Format = firstUrl;
		const file = event.target.files[0];
		console.log({ file });
	};
</script>

<Row class="pt-50">
	<Col xs="12" sm="12" md={{ offset: 2, size: 8 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">Edit Article 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={handleSubmit}>
					<FormGroup class="text-white">
						<Label for="cover-image">Select cover image</Label>
						<Input
							on:change={uploadFiles}
							bind:value={coverImage}
							type="file"
							name="file"
							id="cover-image"
						/>
					</FormGroup>
					{#if imagePreviewInBase64Format}
						<div class="image-preview text-center">
							<Figure>
								<Image
									class="full-width"
									fluid
									alt="Uploaded image"
									src={imagePreviewInBase64Format}
								/>
							</Figure>
						</div>
					{/if}

					<FormGroup class="text-white" floating label="Title">
						<Input class="bg-black text-white" type="email" placeholder="Enter your email" />
					</FormGroup>
					<p
						on:keypress={toggleIsPartOfSeries}
						on:click={toggleIsPartOfSeries}
						class="text-info cursor-pointer"
					>
						Is article part of a series?
					</p>
					{#if isPartOfSeries}
						<FormGroup class="text-white">
							<Label for="exampleSelect">Series</Label>
							<Input type="select" name="select" id="exampleSelect">
								<option selected>Select series</option>
								<option>Typescript</option>
								<option>How to break into tech</option>
							</Input>
						</FormGroup>
					{/if}

					<FormGroup class="text-white">
						<MarkdownEditor on:markdownContent={handleMarkdownContent} />
					</FormGroup>
					<div class="pt-20 pb-20">
						<TagDisplay label="Tags" on:selectTags={handleTagSelection} />
					</div>
					<FormGroup>
						<Button block color="info">Update</Button>
					</FormGroup>
				</Form>
			</CardBody>
		</Card>
	</Col>
</Row>
