<script lang="ts">
	import { onMount } from 'svelte';
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
	import {
		type BaseResponseTypeDTO,
		type FormDataType,
		type NotificationMetaType,
		convertFilesToBase64Strings,
		extractAxiosError,
		extractDataFromLocalStorage,
		httpPatch,
		uploadFiles,
		validateFormData,
		API_BASE_URL
	} from '../../../../../utils';
	import VideoPreview from '../../../../../components/videoPreview.svelte';
	import MultipleImagePreview from '../../../../../components/multipleImagePreview.svelte';
	import ToastNotification from '../../../../../components/toastNotification.svelte';

	export let data: any;
	let error: NotificationMetaType;
	let success: NotificationMetaType;
	let coverVideo: any;
	let videoPreviewInBase64Format: string;
	let isFormValid = false;
	let project: any;
	let existingPhotos: string[];
	let selectedFiles: File[] = [];
	let selectedVideo: File | null;
	let imagePreviewsInBase64Format: string[];

	const formData: FormDataType = {
		name: { value: null, required: true },
		githubUrl: { value: null, required: false },
		appUrl: { value: null, required: true },
		description: { value: null, required: true }
	};

	onMount(() => {
		if (data.success) {
			project = data.data;
			formData.appUrl.value = project.appUrl;
			formData.githubUrl.value = project.githubUrl;
			formData.name.value = project.title;
			formData.description.value = project.description;
			isFormValid = validateFormData(formData);
			existingPhotos = project.sampleImages;
			imagePreviewsInBase64Format = existingPhotos ?? [];
		}
	});

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			const payload: any = {
				projectId: project.id,
				title: formData.name.value,
				appUrl: formData.appUrl.value,
				githubUrl: formData.githubUrl.value,
				description: formData.description.value
			};
			const allSampleImages = [...existingPhotos];
			if (selectedFiles?.length > 0) {
				const { data: uploadedFiles } = await uploadFiles(selectedFiles);
				allSampleImages.push(...uploadedFiles);
			}
			payload.sampleImages = allSampleImages;
			if (selectedVideo) {
				const {
					data: [firstVideo]
				} = await uploadFiles([selectedVideo]);
				payload.videoHighlight = firstVideo;
			}
			const token = extractDataFromLocalStorage('token');
			const response = await httpPatch<BaseResponseTypeDTO<any>, any>(
				`${API_BASE_URL}/project`,
				payload,
				{ Authorization: `Bearer ${token}` }
			);
			if (response.success) {
				success = {
					color: 'success',
					header: 'Info',
					message: response.message
				};
			}
		} catch (ex) {
			const axiosError = extractAxiosError(ex, 'danger', 'Error Occurred');
			if (axiosError) {
				error = axiosError;
			}
			throw ex;
		}
	};

	const uploadImages = async (event: any) => {
		selectedFiles = Array.from(event.target.files);
		const images = await convertFilesToBase64Strings(event);
		// Re-assign back to variable is better for kick starting the API
		imagePreviewsInBase64Format = [...imagePreviewsInBase64Format, ...images];
	};

	const uploadProjectVideo = async (event: any) => {
		const [firstUrl] = await convertFilesToBase64Strings(event);
		videoPreviewInBase64Format = firstUrl;
		selectedVideo = event.target.files[0];
	};
</script>

{#if success && success.message !== ''}
	<ToastNotification
		color={success.color}
		message={success.message}
		header={success.header}
		on:closeToast={() => {
			success.message = '';
			success.color = '';
			success.header = '';
		}}
	/>
{/if}

<Row class="pt-50">
	<Col xs="12" sm="12" md={{ offset: 3, size: 6 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">Edit Project 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={handleSubmit}>
					<FormGroup class="text-white">
						<Label for="cover-image">Select project sample images</Label>
						<Input
							on:change={uploadImages}
							type="file"
							name="file"
							multiple
							accept="image/*"
							id="cover-image"
						/>
					</FormGroup>
					{#if imagePreviewsInBase64Format}
						<MultipleImagePreview urls={imagePreviewsInBase64Format} />
					{/if}

					<FormGroup class="text-white">
						<Label for="cover-image"
							>Select sample video for project <span class="text-info">(Optional)</span></Label
						>
						<Input
							on:change={uploadProjectVideo}
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
						<Input
							on:input={() => (isFormValid = validateFormData(formData))}
							bind:value={formData.name.value}
							class="bg-black text-white"
							type="text"
							placeholder="Enter App Name"
						/>
					</FormGroup>

					<FormGroup class="text-white" floating label="App Url">
						<Input
							on:input={() => (isFormValid = validateFormData(formData))}
							bind:value={formData.appUrl.value}
							class="bg-black text-white"
							type="url"
							placeholder="Enter app's url"
						/>
					</FormGroup>

					<FormGroup class="text-white" floating label="Github Repo Url">
						<Input
							on:input={() => (isFormValid = validateFormData(formData))}
							bind:value={formData.githubUrl.value}
							class="bg-black text-white"
							type="url"
							placeholder="Enter url to github Repo"
						/>
					</FormGroup>

					<FormGroup class="text-white">
						<Label for="exampleText">Description</Label>
						<Input
							on:input={() => (isFormValid = validateFormData(formData))}
							bind:value={formData.description.value}
							class="resize-none"
							type="textarea"
							rows={10}
							name="description"
							id="exampleText"
						/>
					</FormGroup>

					<FormGroup>
						<Button disabled={!isFormValid} block color="info">Update</Button>
					</FormGroup>
				</Form>
			</CardBody>
		</Card>
	</Col>
</Row>
