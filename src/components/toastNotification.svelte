<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Toast, ToastBody, Row, Col, ToastHeader } from 'sveltestrap';

	export let header: string;
	export let message: string;
	export let color: string;

	const dispatch = createEventDispatcher();

	let isOpen = true;

	function toggle() {
		isOpen = !isOpen;
		if (isOpen === false) {
			dispatch('closeToast', { isClosed: true });
		}
	}
</script>

<div class="full-width div-fixed">
	<Row class="pt-50">
		<Col class="no-padding" xs="12" md={{ offset: 4, size: 4 }}>
			<Toast class="full-width" {isOpen}>
				<ToastHeader icon={color} {toggle}>{header}</ToastHeader>
				<ToastBody>{message}</ToastBody>
			</Toast>
		</Col>
	</Row>
</div>

<style>
	.div-fixed {
		position: fixed;
		z-index: 999999;
	}
</style>
