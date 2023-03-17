<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Nav, NavItem, Icon, NavLink } from 'sveltestrap';

	const dispatch = createEventDispatcher();
	let activeRoute = '';

	onMount(() => {
		activeRoute = window.location.pathname;
	});

	const logout = () => {
		dispatch('logout', true);
	};
</script>

<nav class="nav-section full-screen bg-black">
	<Nav tabs>
		<NavItem>
			<NavLink
				href="/dashboard"
				on:click={() => (activeRoute = '/dashboard')}
				class={activeRoute === '/dashboard' ? 'active' : ''}
			>
				<Icon name="controller" /> Dashboard
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink
				on:click={() => (activeRoute = '/dashboard/posts')}
				class={activeRoute === '/dashboard/posts' ? 'active' : ''}
				href="/dashboard/posts"
				><Icon name="pencil-fill" /> Posts
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink
				class={activeRoute === '/dashboard/series' ? 'active' : ''}
				on:click={() => (activeRoute = '/dashboard/series')}
				href="/dashboard/series"
				><Icon name="journals" /> Series
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink
				class={activeRoute === '/dashboard/projects' ? 'active' : ''}
				on:click={() => (activeRoute = '/dashboard/projects')}
				href="/dashboard/projects"
				><Icon name="gear" /> Projects
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink
				on:click={() => (activeRoute = '/dashboard/contact-messages')}
				class={activeRoute === '/dashboard/contact-messages' ? 'active' : ''}
				href="/dashboard/contact-messages"
				><Icon name="envelope-dash" /> Messages
			</NavLink>
		</NavItem>
		<NavItem>
			<NavLink on:click={logout}><Icon name="power" /> Logout</NavLink>
		</NavItem>
	</Nav>
</nav>
