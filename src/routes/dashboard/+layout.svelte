<script lang="ts">
	import { Container } from 'sveltestrap';
	import NavSection from '../../components/navSection.svelte';
</script>

<Container class="bg-jet-dark bg-full-screen p-0" fluid>
	<NavSection />

	<section style="padding: 20px 10px">
		<slot />
	</section>
</Container>
