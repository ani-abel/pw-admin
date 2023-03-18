<script lang="ts">
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
	import {
		extractAxiosError,
		extractDataFromLocalStorage,
		httpPost,
		validateFormData
	} from '../../../../utils/function.util';
	import type {
		NotificationMetaType,
		FormDataType,
		SeriesItemResponseDTO
	} from '../../../../utils/type.util';
	import ToastNotification from '../../../../components/toastNotification.svelte';
	import { API_BASE_URL } from '../../../../utils/const.util';

	let isFormValid = false;
	let error: NotificationMetaType;

	const formData: FormDataType = {
		name: { value: null, required: true }
	};

	const onSubmit = async (e: Event) => {
		e.preventDefault();
		try {
			const url = `${API_BASE_URL}/series`;
			const token = extractDataFromLocalStorage('token');
			const response = await httpPost<SeriesItemResponseDTO, any>(
				url,
				{ name: formData.name.value },
				{ Authorization: `Bearer ${token}` }
			);
			if (response.success) {
				formData.name.value = null;
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

{#if error && error.message !== ''}
	<ToastNotification
		color={error.color}
		message={error.message}
		header={error.header}
		on:closeToast={() => {
			error.message = '';
			error.color = '';
			error.header = '';
		}}
	/>
{/if}
<Row class="pt-50">
	<Col xs="12" sm="12" md={{ offset: 4, size: 4 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">New Series 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={onSubmit}>
					<FormGroup class="text-white" floating label="Name">
						<Input
							required
							class="bg-black text-white"
							type="text"
							bind:value={formData.name.value}
							on:input={() => (isFormValid = validateFormData(formData))}
							placeholder="Enter name of series"
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
