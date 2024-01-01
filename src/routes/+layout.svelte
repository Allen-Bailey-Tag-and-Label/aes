<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { clickOutside } from '$actions';
	import { A, Button, Header, Icon, Nav, Title } from '$components';
	import { theme } from '$stores';
	import '../app.pcss';
	import { ChevronRight } from '@steeze-ui/feather-icons';

	// props (internal)
	const nav = [
		{
			isOpen: false,
			label: 'Item Master',
			children: [
				[
					{ href: '/item-master/configured-item-operations', label: 'Configured Item - Operations' }
				],
				[{ href: '/work-center-setup', label: 'Work Center Setup' }]
			]
		},
		{
			isOpen: false,
			label: 'Administration',
			children: [
				[
					{
						label: 'Application',
						children: [
							[{ href: '/administration/application/branch-setup', label: 'Branch Setup' }]
						]
					}
				]
			]
		}
	];
</script>

<Title base="AES" />
<Header>
	<Nav>
		{#each nav as navItem}
			<div class="relative flex">
				<Button
					on:click={() => (navItem.isOpen = !navItem.isOpen)}
					use={[[clickOutside, () => (navItem.isOpen = false)]]}
				>
					{navItem.label}
				</Button>
				<div
					class={twMerge(
						'absolute bottom-0 left-0 flex translate-y-full flex-col divide-y divide-neutral-300 bg-white text-black',
						navItem.isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
					)}
				>
					{#each navItem.children as group}
						<div class="flex flex-col py-[.25rem]">
							{#each group as groupItem}
								{#if groupItem?.children !== undefined}
									<div class="group relative flex">
										<Button on:click={() => (groupItem.isOpen = !groupItem.isOpen)}>
											<div class="flex justify-between space-x-4">
												<div>
													{groupItem.label}
												</div>
												<Icon src={ChevronRight} />
											</div>
										</Button>
										<div
											class={twMerge(
												'pointer-events-none absolute right-0 top-0 flex translate-x-full flex-col divide-y divide-neutral-300 bg-white text-black opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
											)}
										>
											{#each groupItem.children as childGroup}
												<div class="flex flex-col py-[.25rem]">
													{#each childGroup as childItem}
														<A
															class="whitespace-nowrap px-8 py-1 shadow-none hover:bg-blue-300 hover:text-black focus:bg-blue-300 focus:ring-blue-300/30"
															href={childItem.href}
															tabindex={childItem.isOpen ? undefined : '-1'}>{childItem.label}</A
														>
													{/each}
												</div>
											{/each}
										</div>
									</div>
								{/if}
								{#if groupItem.href}
									<A
										class="whitespace-nowrap px-8 py-1 shadow-none hover:bg-blue-300 hover:text-black focus:bg-blue-300 focus:ring-blue-300/30"
										href={groupItem.href}
										tabindex={groupItem.isOpen ? undefined : '-1'}>{groupItem.label}</A
									>
								{/if}
							{/each}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</Nav>
</Header>
<slot />
