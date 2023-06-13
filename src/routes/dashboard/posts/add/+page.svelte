<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Row,
		Col,
		Card,
		Figure,
		Image,
		CardBody,
		Label,
		FormGroup,
		Input,
		Button,
		Form,
		CardHeader
	} from 'sveltestrap';
	import MarkdownEditor from '../../../../components/markdownEditor.svelte';
	import TagDisplay from '../../../../components/tagDisplay.svelte';
	import {
		convertFilesToBase64Strings,
		extractAxiosError,
		extractDataFromLocalStorage,
		httpPost,
		uploadFiles,
		validateFormData
	} from '../../../../utils/function.util';
	import ToastNotification from '../../../../components/toastNotification.svelte';
	import type {
		BaseResponseTypeDTO,
		FormDataType,
		NotificationMetaType
	} from '../../../../utils/type.util';
	import { API_BASE_URL } from '../../../../utils/const.util';

	export let data: any;
	let selectedTags: string[] = [];
	let allTags: any[] = [];
	let allSeries: any[] = [];
	let coverImage: File | null;
	let imagePreviewInBase64Format: string | null;
	let isPartOfSeries = false;
	const toggleIsPartOfSeries = () => (isPartOfSeries = !isPartOfSeries);
	let isFormValid = false;
	let error: NotificationMetaType;
	let success: NotificationMetaType;
	const formData: FormDataType = {
		title: { value: null, required: true },
		body: { value: null, required: true },
		keyPhrases: { value: null, required: true },
		selectedSeries: { value: null, required: false }
	};

	onMount(() => {
		allTags = data.tags.data;
		allSeries = data.series.data;
	});

	const resetForm = () => {
		formData.title.value = null;
		formData.selectedSeries.value = null;
		formData.body.value = null;
		formData.keyPhrases.value = null;
		imagePreviewInBase64Format = null;
		isFormValid = false;
		selectedTags = [];
		coverImage = null;
	};

	const handleMarkdownContent = (message: CustomEvent) => {
		formData.body.value = message.detail;
		isFormValid = validateFormData(formData);
	};

	const handleTagSelection = (message: CustomEvent) => {
		selectedTags = message.detail;
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		try {
			const payload: any = {
				title: formData.title.value,
				body: formData.body.value,
				keyPhrases: formData.keyPhrases.value
			};
			if (coverImage) {
				const {
					data: [coverImageLink]
				} = await uploadFiles([coverImage]);
				payload.coverImage = coverImageLink;
			}
			if (formData.selectedSeries.value) {
				payload.seriesId = formData.selectedSeries.value;
			}
			if (selectedTags?.length > 0) {
				payload.tags = selectedTags;
			}
			const token = extractDataFromLocalStorage('token');
			const response = await httpPost<BaseResponseTypeDTO<any>, any>(
				`${API_BASE_URL}/post`,
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

	const uploadImage = async (event: any) => {
		const [firstUrl] = await convertFilesToBase64Strings(event);
		imagePreviewInBase64Format = firstUrl;
		coverImage = event.target.files[0];
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
	<Col xs="12" sm="12" md={{ offset: 2, size: 8 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">Write Article 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={handleSubmit}>
					<FormGroup class="text-white">
						<Label for="cover-image">Select cover image</Label>
						<Input
							on:change={uploadImage}
							type="file"
							name="file"
							accept="image/*"
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
						<Input
							bind:value={formData.title.value}
							on:keydown={() => (isFormValid = validateFormData(formData))}
							class="bg-black text-white"
							type="text"
							placeholder="Enter article title"
						/>
					</FormGroup>
					<FormGroup class="text-white" floating label="Key Phrases [SEO]">
						<Input
							bind:value={formData.keyPhrases.value}
							on:keydown={() => (isFormValid = validateFormData(formData))}
							class="bg-black text-white"
							type="text"
							placeholder="Enter key phrases"
						/>
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
							<Input
								bind:value={formData.selectedSeries.value}
								on:change={() => (isFormValid = validateFormData(formData))}
								type="select"
								name="select"
								id="exampleSelect"
							>
								<option selected>Select series</option>
								{#each allSeries as item}
									<option value={item.id}>{item.name}</option>
								{/each}
							</Input>
						</FormGroup>
					{/if}
					<FormGroup class="text-white">
						<MarkdownEditor on:markdownContent={handleMarkdownContent} />
					</FormGroup>
					<div class="pt-20 pb-20">
						<TagDisplay tags={allTags} label="Tags" on:selectTags={handleTagSelection} />
					</div>
					<FormGroup>
						<Button disabled={!isFormValid} block color="info">Save</Button>
					</FormGroup>
				</Form>
			</CardBody>
		</Card>
	</Col>
</Row>
