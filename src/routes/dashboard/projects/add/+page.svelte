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
	import {
		convertFilesToBase64Strings,
		extractAxiosError,
		extractDataFromLocalStorage,
		httpPost,
		uploadFiles,
		validateFormData
	} from '../../../../utils/function.util';
	import type {
		BaseResponseTypeDTO,
		FormDataType,
		NotificationMetaType
	} from '../../../../utils/type.util';
	import VideoPreview from '../../../../components/videoPreview.svelte';
	import MultipleImagePreview from '../../../../components/multipleImagePreview.svelte';
	import { API_BASE_URL } from '../../../../utils/const.util';
	import ToastNotification from '../../../../components/toastNotification.svelte';

	let error: NotificationMetaType;
	let success: NotificationMetaType;
	let coverVideo: any;
	let imagePreviewsInBase64Format: string[];
	let videoPreviewInBase64Format: string | null;
	let selectedFiles: File[] = [];
	let selectedVideo: File | null;
	let isFormValid = false;

	const formData: FormDataType = {
		name: { value: null, required: true },
		description: { value: null, required: true }
	};

	const uploadImages = async (event: any) => {
		selectedFiles = Array.from(event.target.files);
		imagePreviewsInBase64Format = await convertFilesToBase64Strings(event);
	};

	const uploadProjectVideo = async (event: any) => {
		const [firstUrl] = await convertFilesToBase64Strings(event);
		videoPreviewInBase64Format = firstUrl;
		selectedVideo = event.target.files[0];
	};

	const resetForm = () => {
		formData.name.value = null;
		formData.description.value = null;
		selectedFiles = [];
		imagePreviewsInBase64Format = [];
		videoPreviewInBase64Format = null;
		selectedVideo = null;
		coverVideo = null;
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			const payload: any = {
				title: formData.name.value,
				description: formData.description.value
			};
			if (selectedVideo) {
				const { data } = await uploadFiles([selectedVideo]);
				payload.videoHighlight = data[0];
			}
			if (selectedFiles?.length > 0) {
				const { data } = await uploadFiles(selectedFiles);
				payload.sampleImages = data;
			}
			const token = extractDataFromLocalStorage('token');
			const response = await httpPost<BaseResponseTypeDTO<any>, any>(
				`${API_BASE_URL}/project`,
				payload,
				{ Authorization: `Bearer ${token}` }
			);
			if (response.success) {
				resetForm();
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
				<h2 class="text-white">Add Project 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={handleSubmit}>
					<FormGroup class="text-white">
						<Label for="cover-image">Select project sample images</Label>
						<Input
							on:change={uploadImages}
							type="file"
							multiple
							name="file"
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
							placeholder="Enter your email"
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
						<Button disabled={!isFormValid} block color="info">Save</Button>
					</FormGroup>
				</Form>
			</CardBody>
		</Card>
	</Col>
</Row>
