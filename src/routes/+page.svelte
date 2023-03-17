<script lang="ts">
	import { goto } from '$app/navigation';
	import { Card, CardBody, Container, Button, Row, Col, Input, FormGroup, Form } from 'sveltestrap';
	import { extractAxiosError, httpPost, validateFormData } from '../utils/function.util';
	import { API_BASE_URL } from '../utils/const.util';
	import ToastNotification from '../components/toastNotification.svelte';
	import type { ErrorMetaType, AuthResponseDTO, FormDataType } from '../utils/type.util';

	let isFormValid = false;
	let error: ErrorMetaType;

	const formData: FormDataType = {
		email: { value: null, required: true },
		password: { value: null, required: true }
	};

	const setCredentialsInLocalStorage = (data: any) => {
		localStorage.setItem('token', data.token);
		localStorage.setItem('userRecord', JSON.stringify(data));
	};

	const onSubmit = async (e: Event) => {
		try {
			e.preventDefault();
			const url = `${API_BASE_URL}/auth/login`;
			const reqBody = {
				email: formData.email.value,
				password: formData.password.value
			};
			const response = await httpPost<AuthResponseDTO, any>(url, reqBody);
			setCredentialsInLocalStorage(response.data);
			goto('/dashboard');
		} catch (ex) {
			const axiosError = extractAxiosError(ex, 'danger', 'Error occurred');
			if (axiosError) {
				error = axiosError;
			}
			throw ex;
		}
	};
</script>

<Container class="bg-jet-dark bg-full-screen" fluid>
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
		/>{/if}

	<Row class="pt-50">
		<h1 class="text-center p-20 text-white">Login</h1>
		<Col xs="12" sm={{ offset: 1, size: 10 }} md={{ offset: 4, size: 4 }}>
			<Card class="bg-black">
				<CardBody>
					<Form on:submit={onSubmit}>
						<FormGroup class="text-white" floating label="Username">
							<Input
								bind:value={formData.email.value}
								class="bg-black text-white"
								type="email"
								on:input={() => (isFormValid = validateFormData(formData))}
								required
								placeholder="Enter your email"
							/>
						</FormGroup>
						<FormGroup class="text-white" floating label="Password">
							<Input
								bind:value={formData.password.value}
								class="bg-black text-white"
								type="password"
								on:input={() => (isFormValid = validateFormData(formData))}
								required
								placeholder="Enter your email"
							/>
						</FormGroup>
						<FormGroup>
							<Button disabled={!isFormValid} type="submit" block color="info">Login</Button>
						</FormGroup>
					</Form>
				</CardBody>
			</Card>
		</Col>
	</Row>
</Container>
