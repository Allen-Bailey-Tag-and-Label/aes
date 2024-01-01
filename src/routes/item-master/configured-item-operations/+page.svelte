<script lang="ts">
	import { ButtonIcon, Card, Form, Header, Icon, Input, Nav, Table, Th, Thead } from '$components';
	import { Plus, Save, Search, X } from '$icons';

	// props (internal)
	const table = {
		columns: [
			{ label: 'Branch', field: 'branch' },
			{ label: 'Item', field: 'item' },
			{ label: 'Item2', field: 'item2' },
			{ label: 'OpID', field: 'operationId' },
			{ label: 'Operation', field: 'operation' },
			{ label: 'MinOrderQty', field: 'minOrderQty' },
			{ label: 'MaxOrderQty', field: 'maxOrderQty' },
			{ label: 'WorkCenter', field: 'workCenter' },
			{ label: 'Description', field: 'description' },
			{ label: 'CapacityPerHr', field: 'CapacityPerHr' },
			{ label: 'UOM', field: 'uom' }
		]
	};
	const toolbar = [
		[{ src: Search }, { src: Save }],
		[{ src: Plus }, { src: X }]
	];
</script>

<Header class="bg-neutral-200 dark:bg-neutral-200">
	<Nav>
		<div class="flex divide-x divide-neutral-400">
			{#each toolbar as group}
				<div class="flex px-2">
					{#each group as { src }}
						<ButtonIcon>
							<Icon {src} />
						</ButtonIcon>
					{/each}
				</div>
			{/each}
		</div>
	</Nav>
</Header>
<Card>
	<Form class="grid grid-cols-[fit-content(0px)_fit-content(0px)_1fr] items-center gap-2 space-y-0">
		<div class="whitespace-nowrap">Branch / Plant:</div>
		<Input name="branch" required="required" />
		<Input disabled="disabled" />
		<div class="whitespace-nowrap">2nd Item Number:</div>
		<Input name="item2" required="required" />
		<Input disabled="disabled" />
	</Form>
</Card>
<Card class="items-start">
	<Table>
		<Thead>
			<Th></Th>
			{#each table.columns as { label }}
				<Th>{label}</Th>
			{/each}
		</Thead>
	</Table>
</Card>
