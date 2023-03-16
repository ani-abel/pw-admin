<script lang="ts">
	import {
		Table,
		Row,
		Col,
		Pagination,
		PaginationItem,
		PaginationLink,
		Card,
		Icon,
		CardBody,
		CardFooter,
		DropdownItem,
		DropdownMenu,
		Dropdown,
		DropdownToggle
	} from 'sveltestrap';
</script>

<Row class="pt-50">
	<Col xs="12" sm={{ offset: 1, size: 10 }} md={{ offset: 1, size: 10 }}>
		<Card class="bg-black">
			<CardBody>
				<Table dark>
					<thead>
						<tr>
							<th>#</th>
							<th>Sender</th>
							<th>Message</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Date Written</th>
							<th />
						</tr>
					</thead>
					<tbody>
						<tr>
							<!-- svelte-ignore a11y-misplaced-scope -->
							<td scope="row">1</td>
							<td>Mark Tyler</td>
							<td
								>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptatem aliquam
								ex, similique optio qui.</td
							>
							<td>tim@gmail.com</td>
							<td>01838899</td>
							<td>12/12/2023</td>
							<td>
								<Dropdown autoClose={true}>
									<DropdownToggle>
										<Icon name="three-dots-vertical" />
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem>Mark as read</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</td>
						</tr>
					</tbody>
				</Table>
			</CardBody>
			<CardFooter>
				<Pagination class="justify-content-center" size="md">
					<PaginationItem>
						<PaginationLink first href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink previous href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink next href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink last href="#" />
					</PaginationItem>
				</Pagination>
			</CardFooter>
		</Card>
	</Col>
</Row>

<style></style>
