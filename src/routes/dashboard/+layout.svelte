<script lang="ts">
	import { Container } from 'sveltestrap';
	import NavSection from '../../components/navSection.svelte';

	const logout = () => {
		// logic here
	};
</script>

<Container class="bg-jet-dark bg-full-screen p-0" fluid>
	<NavSection on:logout={logout} />

	<section style="padding: 20px 10px">
		<slot />
	</section>
</Container>
