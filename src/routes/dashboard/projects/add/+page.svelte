<script lang="ts">
	import {
		Row,
		Col,
		Card,
		CardBody,
		Label,
		FormGroup,
		Input,
		Button,
		Form,
		CardHeader
	} from 'sveltestrap';
	import { convertFilesToBase64Strings } from '../../../../utils/function.util';
	import VideoPreview from '../../../../components/videoPreview.svelte';
	import MultipleImagePreview from '../../../../components/multipleImagePreview.svelte';

	let coverImage: any;
	let coverVideo: any;
	let imagePreviewInBase64Format: string;
	let videoPreviewInBase64Format: string;

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

	const uploadVideos = async (event: any) => {
		const [firstUrl] = await convertFilesToBase64Strings(event);
		videoPreviewInBase64Format = firstUrl;
		const file = event.target.files[0];
		console.log({ file });
		console.log({ coverVideo });
	};
</script>

<Row class="pt-50">
	<Col xs="12" sm="12" md={{ offset: 3, size: 6 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">Add Project 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={handleSubmit}>
					<FormGroup class="text-white">
						<Label for="cover-image">Select project sample images</Label>
						<Input
							on:change={uploadFiles}
							bind:value={coverImage}
							type="file"
							name="file"
							accept="image/*"
							id="cover-image"
						/>
					</FormGroup>
					{#if imagePreviewInBase64Format}
						<MultipleImagePreview urls={[imagePreviewInBase64Format]} />
					{/if}

					<FormGroup class="text-white">
						<Label for="cover-image"
							>Select sample video for project <span class="text-info">(Optional)</span></Label
						>
						<Input
							on:change={uploadVideos}
							bind:value={coverVideo}
							type="file"
							name="file"
							accept="video/*"
							id="sample-video"
						/>
					</FormGroup>
					{#if videoPreviewInBase64Format}
						<VideoPreview fileName={coverVideo} url={videoPreviewInBase64Format} />
					{/if}

					<FormGroup class="text-white" floating label="Name">
						<Input class="bg-black text-white" type="text" placeholder="Enter your email" />
					</FormGroup>

					<FormGroup class="text-white">
						<Label for="exampleText">Description</Label>
						<Input
							class="resize-none"
							type="textarea"
							rows={10}
							name="description"
							id="exampleText"
						/>
					</FormGroup>

					<FormGroup>
						<Button block color="info">Save</Button>
					</FormGroup>
				</Form>
			</CardBody>
		</Card>
	</Col>
</Row>
