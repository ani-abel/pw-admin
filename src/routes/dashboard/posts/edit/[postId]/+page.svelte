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
		CardHeader,
		Input,
		Button,
		Form
	} from 'sveltestrap';
	import ToastNotification from '../../../../../components/toastNotification.svelte';
	import MarkdownEditor from '../../../../../components/markdownEditor.svelte';
	import TagDisplay from '../../../../../components/tagDisplay.svelte';
	import {
		convertFilesToBase64Strings,
		extractAxiosError,
		extractDataFromLocalStorage,
		httpPatch,
		uploadFiles,
		validateFormData,
		validateURL
	} from '../../../../../utils/function.util';
	import type {
		BaseResponseTypeDTO,
		FormDataType,
		NotificationMetaType
	} from '../../../../../utils/type.util';
	import { API_BASE_URL } from '../../../../../utils/const.util';

	export let data: any;
	let isFormValid = false;
	let selectedTags: string[] = [];
	let coverImage: File;
	let imagePreviewInBase64Format: string;
	let isPartOfSeries = false;
	const toggleIsPartOfSeries = () => (isPartOfSeries = !isPartOfSeries);
	let post: any;
	let allTags: any[] = [];
	let allSeries: any[] = [];
	let error: NotificationMetaType;
	let success: NotificationMetaType;
	const formData: FormDataType = {
		title: { value: null, required: true },
		body: { value: null, required: true },
		selectedSeries: { value: null, required: false }
	};

	onMount(() => {
		allSeries = data.series.data;
		allTags = data.tags.data;
		post = data.post.data;
		selectedTags = (post.tagsForThisPost as any[]).map(({ tag }) => tag.name);
		if (post?.id) {
			imagePreviewInBase64Format = post.coverImage;
			formData.body.value = post.body;
			formData.title.value = post.title;
			formData.selectedSeries.value = post.seriesId;
		}
	});

	const handleMarkdownContent = (message: CustomEvent) => {
		formData.body.value = message.detail;
		isFormValid = validateFormData(formData);
	};

	const handleTagSelection = (message: CustomEvent) => {
		selectedTags = [...message.detail];
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			const payload: any = {
				postId: post.id,
				title: formData.title.value,
				body: formData.body.value
			};
			if (coverImage && !validateURL(imagePreviewInBase64Format)) {
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
			const response = await httpPatch<BaseResponseTypeDTO<any>, any>(
				`${API_BASE_URL}/post`,
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
				<h2 class="text-white">Edit Article 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={handleSubmit}>
					<FormGroup class="text-white">
						<Label for="cover-image">Select cover image</Label>
						<Input
							on:change={uploadImage}
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
						<Input
							bind:value={formData.title.value}
							on:keydown={() => (isFormValid = validateFormData(formData))}
							class="bg-black text-white"
							type="text"
							placeholder="Enter article title"
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
						<MarkdownEditor value={post?.body} on:markdownContent={handleMarkdownContent} />
					</FormGroup>
					{#if selectedTags?.length > 0}
						<div class="pt-20 pb-20">
							<TagDisplay
								preDisplayedTags={selectedTags}
								tags={allTags}
								label="Tags"
								on:selectTags={handleTagSelection}
							/>
						</div>
					{/if}
					<FormGroup>
						<Button block color="info">Update</Button>
					</FormGroup>
				</Form>
			</CardBody>
		</Card>
	</Col>
</Row>
