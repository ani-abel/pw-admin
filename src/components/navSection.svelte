<script lang="ts">
	import { onMount } from 'svelte';
	import { Nav, NavItem, NavLink } from 'sveltestrap';

	let activeRoute = '';

	onMount(() => {
		activeRoute = window.location.pathname;
	});
</script>

<nav class="nav-section full-screen bg-black">
	<Nav tabs>
		<NavItem>
			<NavLink
				href="/dashboard"
				on:click={() => (activeRoute = '/dashboard')}
				class={activeRoute === '/dashboard' ? 'active' : ''}
			>
				Dashboard
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink
				on:click={() => (activeRoute = '/dashboard/posts')}
				class={activeRoute === '/dashboard/posts' ? 'active' : ''}
				href="/dashboard/posts"
				>Posts
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink
				class={activeRoute === '/dashboard/series' ? 'active' : ''}
				on:click={() => (activeRoute = '/dashboard/series')}
				href="/dashboard/series"
				>Series
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink
				class={activeRoute === '/dashboard/projects' ? 'active' : ''}
				on:click={() => (activeRoute = '/dashboard/projects')}
				href="/dashboard/projects"
				>Projects
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink
				on:click={() => (activeRoute = '/dashboard/contact-messages')}
				class={activeRoute === '/dashboard/contact-messages' ? 'active' : ''}
				href="/dashboard/contact-messages"
				>Contact Messages
			</NavLink>
		</NavItem>
	</Nav>
</nav>
