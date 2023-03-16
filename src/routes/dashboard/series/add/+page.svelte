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

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		console.log({ message: 'submitted' });
	};
</script>

<Row class="pt-50">
	<Col xs="12" sm="12" md={{ offset: 4, size: 4 }}>
		<Card class="bg-black">
			<CardHeader>
				<h2 class="text-white">New Series 🖍</h2>
			</CardHeader>
			<CardBody>
				<Form method="POST" on:submit={handleSubmit}>
					<FormGroup class="text-white" floating label="Name">
						<Input class="bg-black text-white" type="email" placeholder="Enter your email" />
					</FormGroup>

					<FormGroup>
						<Button block color="info">Save</Button>
					</FormGroup>
				</Form>
			</CardBody>
		</Card>
	</Col>
</Row>
