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
		CardHeader,
		DropdownItem,
		DropdownMenu,
		Dropdown,
		DropdownToggle
	} from 'sveltestrap';
</script>

<Row class="pt-50">
	<Col xs="12" sm={{ offset: 1, size: 10 }} md={{ offset: 1, size: 10 }}>
		<Card class="bg-black">
			<CardHeader>
				<div class="full-screen text-right p-10">
					<a href="/dashboard/posts/add" class="btn btn-danger">Add</a>
				</div>
			</CardHeader>
			<CardBody>
				<Table dark>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Tags</th>
							<th>Series</th>
							<th>Date Written</th>
							<th />
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Tech, Bio, Audi</td>
							<td>@mdo</td>
							<td>12/12/2023</td>
							<td>
								<Dropdown autoClose={true}>
									<DropdownToggle>
										<Icon name="three-dots-vertical" />
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem href="/dashboard/posts/preview/o1o00">Preview</DropdownItem>
										<DropdownItem href="/dashboard/posts/edit/o1o00">Edit</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</td>
						</tr>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Tech, Bio, Audi</td>
							<td>@mdo</td>
							<td>12/12/2023</td>
							<td>
								<Dropdown autoClose={true}>
									<DropdownToggle>
										<Icon name="three-dots-vertical" />
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem href="/dashboard/posts/preview/o1o00">Preview</DropdownItem>
										<DropdownItem href="/dashboard/posts/edit/o1o00">Edit</DropdownItem>
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
