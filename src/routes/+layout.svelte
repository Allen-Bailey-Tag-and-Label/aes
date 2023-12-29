<script>
	import { twMerge } from 'tailwind-merge';
	import { clickOutside } from '$actions';
	import { A, Button, Header, Nav, Title } from '$components';
	import { theme } from '$stores';
	import '../app.pcss';

	// props (internal)
	const nav = [
		{
			isOpen: false,
			label: 'Item Master',
			children: [
				[{ href: '/item-master/configured-item-operations', label: 'Configured Item - Operations' }]
			]
		}
	];
</script>

<Title base="AES" />
<Header>
	<Nav class="overflow-visible">
		{#each nav as { isOpen, label, children }}
			<div class="relative flex">
				<Button
					class="rounded-none bg-transparent px-2 py-1 text-black shadow-none hover:bg-blue-300 focus:bg-blue-300 focus:ring-blue-300/30"
					on:click={() => (isOpen = !isOpen)}
					use={[[clickOutside, () => (isOpen = false)]]}
				>
					{label}
				</Button>
				<div
					class={twMerge(
						'absolute bottom-0 left-0 flex translate-y-full flex-col divide-y divide-neutral-300 bg-white text-black',
						isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
					)}
				>
					{#each children as group}
						<div class="flex flex-col py-[.25rem]">
							{#each group as { href, label }}
								<A
									class="px-8 py-1 shadow-none hover:bg-blue-300 hover:text-black focus:bg-blue-300 focus:ring-blue-300/30"
									{href}
									tabindex={isOpen ? undefined : '-1'}>{label}</A
								>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</Nav>
</Header>
<slot />
