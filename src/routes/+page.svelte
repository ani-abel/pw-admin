<script lang="ts">
	import { Card, CardBody, Container, Button, Row, Col, Input, FormGroup, Form } from 'sveltestrap';
</script>

<Container class="bg-jet-dark bg-full-screen" fluid>
	<Row class="pt-50">
		<h1 class="text-center p-20 text-white">Login</h1>
		<Col xs="12" sm={{ offset: 1, size: 10 }} md={{ offset: 3, size: 6 }}>
			<Card class="bg-black">
				<CardBody>
					<Form>
						<FormGroup class="text-white" floating label="Username">
							<Input class="bg-black text-white" type="email" placeholder="Enter your email" />
						</FormGroup>
						<FormGroup class="text-white" floating label="Password">
							<Input class="bg-black text-white" type="password" placeholder="Enter your email" />
						</FormGroup>
						<FormGroup>
							<Button block color="info">Login</Button>
						</FormGroup>
					</Form>
				</CardBody>
			</Card>
		</Col>
	</Row>
</Container>
