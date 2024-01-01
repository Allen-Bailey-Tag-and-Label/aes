<script lang="ts">
	// imports
	import { current_component } from 'svelte/internal';
	import { twMerge } from 'tailwind-merge';
	import { getEvents } from '$actions';
	import { Button } from '$components';
	import { theme } from '$stores';

	// props (external)
	export let style: string | undefined = undefined;
	export let type: string = 'button';
	export let use: any[] = [];

	// props (internal)
	const events = getEvents(current_component);

	// props (dynamic)
	$: classes = twMerge($theme.buttonIcon, $$props.class);
</script>

<Button class={classes} {style} {type} use={[events, ...use]}>
	<slot />
</Button>
