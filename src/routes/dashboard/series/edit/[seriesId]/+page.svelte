<script lang="ts">
	import { API_BASE_URL } from '../../../../../utils/const.util';
	import {
		extractAxiosError,
		extractDataFromLocalStorage,
		httpPatch
	} from '../../../../../utils/function.util';
	import ToastNotification from '../../../../../components/toastNotification.svelte';
	import type {
		BaseResponseTypeDTO,
		FormDataType,
		NotificationMetaType,
		Series
	} from '../../../../../utils/type.util';
	import { onMount } from 'svelte';
	import {
		Row,
		Col,
		Card,
		CardBody,
		FormGroup,
		Input,
		Button,
		Form,
		CardHeader
	} from 'sveltestrap';

	export let data: any;
	let series: Series;
	let error: NotificationMetaType;
	let success: NotificationMetaType;

	const formData: FormDataType = {
		name: { value: null, required: true }
	};

	onMount(() => {
		series = data.data;
		formData.name.value = series.name;
	});

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			console.log({ formData });
			const token = extractDataFromLocalStorage('token');
			const response = await httpPatch<BaseResponseTypeDTO<any>, any>(
				`${API_BASE_URL}/series`,
				{
					name: formData.name.value,
					seriesId: series.id
				},
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
	<Col xs="12" sm="12" md={{ offset: 4, size: 4 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">Update Series 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={handleSubmit}>
					<FormGroup class="text-white" floating label="Name">
						<Input
							bind:value={formData.name.value}
							class="bg-black text-white"
							type="text"
							placeholder="Enter series name"
						/>
					</FormGroup>

					<FormGroup>
						<Button block color="info">Update</Button>
					</FormGroup>
				</Form>
			</CardBody>
		</Card>
	</Col>
</Row>
