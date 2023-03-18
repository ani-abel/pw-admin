<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Container } from 'sveltestrap';
	import NavSection from '../../components/navSection.svelte';

	onMount(() => {
		const jwtToken = localStorage.getItem('token');
		if (!jwtToken) {
			logout();
		}
	});

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userRecord');
		goto('/');
	};
</script>

<Container class="bg-jet-dark bg-full-screen p-0" fluid>
	<NavSection on:logout={logout} />
	<section style="padding: 20px 10px">
		<slot />
	</section>
</Container>
