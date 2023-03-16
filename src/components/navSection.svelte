<script type="ts">
	import { Nav, NavItem, NavLink } from 'sveltestrap';
</script>

<nav class="nav-section full-screen bg-black">
	<Nav tabs>
		<NavItem>
			<NavLink href="/dashboard" active>Dashboard</NavLink>
		</NavItem>
		<NavItem>
			<NavLink href="/dashboard/posts">Posts</NavLink>
		</NavItem>
		<NavItem>
			<NavLink href="/dashboard/series">Series</NavLink>
		</NavItem>
		<NavItem>
			<NavLink href="/dashboard/projects">Projects</NavLink>
		</NavItem>
		<NavItem>
			<NavLink href="/dashboard/contact-messages">Contact Messages</NavLink>
		</NavItem>
	</Nav>
</nav>
