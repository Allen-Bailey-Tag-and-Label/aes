<script lang="ts">
	import { DateTime } from 'luxon';
	import { twMerge } from 'tailwind-merge';
	import { deserialize } from '$app/forms';
	import {
		Button,
		ButtonIcon,
		Checkbox,
		Icon,
		Header,
		Nav,
		Card,
		Input,
		Select,
		Table,
		Thead,
		Th,
		Tbody,
		Tr,
		Td,
		Form
	} from '$components';
	import { Plus, Save, Search, X } from '$icons';
	import { type Column } from './types';

	// props (external)
	export let columns: Column[] = [];

	// props (internal)
	let branch = '';
	let initialRows: null | { [key: string]: any }[] = null;
	let rows: { data: { [key: string]: any }; selected: boolean }[] = [];
	const toolbar: (
		| {
				action: string;
				src: any;
				use: any[];
		  }
		| {
				action: string;
				src: any;
				submitHandler: Function;
		  }
		| {
				src: any;
		  }
		| {
				clickHandler: Function;
				src: any;
				type: 'button';
		  }
	)[][] = [
		[
			{
				action: '?/find',
				src: Search,
				submitHandler: async (e) => {
					e.preventDefault();
					const formData = new FormData();
					formData.append('branch', branch);
					const response = await fetch('?/find', {
						method: 'POST',
						body: formData
					});
					const result = deserialize(await response.text());
					initialRows = result.data.rows.map((row) => ({ selected: false, data: row }));
					rows = result.data.rows.map((row) => ({ selected: false, data: row }));
				}
			}
		],
		[
			{
				action: '?/save',
				src: Save,
				submitHandler: async (e) => {
					e.preventDefault();
					const formData = new FormData();
					formData.append(
						'rows',
						JSON.stringify(
							rows
								.filter(
									(row) =>
										Object.values(row.data)
											.map((v) => (v === false ? '' : v))
											.join('') !== ''
								)
								.map((row) =>
									columns.reduce(
										(obj: { [key: string]: any }, column) => {
											const { field } = column;
											if (column?.isUseDefault === true) return obj;
											obj[field] = row.data[field];
											if (column?.type === 'dateTime') obj[field] = new Date();
											return obj;
										},
										{ id: row.data.id }
									)
								)
						)
					);
					await fetch('?/save', {
						method: 'POST',
						body: formData
					});
				}
			}
		],
		[
			{
				action: '?/delete',
				src: X,
				submitHandler: async (e) => {
					e.preventDefault();
					const formData = new FormData();
					formData.append('id', rows.find((row) => row.selected)?.data.id);
					await fetch('?/delete', {
						method: 'POST',
						body: formData
					});
					rows = rows.filter((row) => !row.selected);
				}
			}
		]
	];

	$: if (
		rows.filter(
			(row) =>
				Object.values(row.data)
					.map((v) => (v === false ? '' : v))
					.join('') === ''
		).length > 1
	) {
		rows = rows.filter(
			(row) =>
				Object.values(row.data)
					.map((v) => (v === false ? '' : v))
					.join('') !== ''
		);
	}
	$: if (rows.filter((row) => Object.values(row.data).join('') === '').length < 1) {
		rows = [
			...rows,
			{
				data: columns.reduce(
					(obj: { [key: string]: any }, column) => {
						obj[column.field] = '';
						return obj;
					},
					{ id: null }
				),
				selected: false
			}
		];
	}
</script>

<Header class="bg-neutral-200 dark:bg-neutral-200">
	<Nav>
		<div class="flex divide-x divide-neutral-400">
			{#each toolbar as group}
				<div class="flex px-2">
					{#each group as { action, clickHandler, src, submitHandler, type = 'form', use }}
						{#if type === 'button'}
							<ButtonIcon on:click={clickHandler}>
								<Icon {src} />
							</ButtonIcon>
						{/if}
						{#if type === 'form'}
							<Form {action} on:submit={submitHandler} {use}>
								<ButtonIcon type="submit">
									<Icon {src} />
								</ButtonIcon>
								<Input
									bind:value={branch}
									class="absolute left-0 top-0 hidden h-0 w-0 opacity-0"
									name="branch"
									type="hidden"
								/>
							</Form>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</Nav>
</Header>
<Card>
	<div class="grid grid-cols-[repeat(2,_fit-content(0px))] items-center gap-2">
		<div class="whitespace-nowrap">Branch ID:</div>
		<Input bind:value={branch} name="branch" required="required" />
	</div>
</Card>
{#if initialRows !== null}
	<Card class="items-start">
		<Table>
			<Thead>
				<Th />
				{#each columns as { label }}
					<Th>
						{label}
					</Th>
				{/each}
			</Thead>
			<Tbody>
				{#each rows as { data: row, selected }, i}
					<Tr
						class={twMerge(
							selected
								? 'bg-blue-500 text-white even:bg-blue-500 hover:bg-blue-500 hover:even:bg-blue-500 dark:bg-blue-500 dark:text-white dark:even:bg-blue-500 dark:hover:bg-blue-500 dark:hover:even:bg-blue-500'
								: undefined
						)}
					>
						<Td class="p-0">
							<Button
								class="hover w-full px-8 text-current"
								on:click={() => {
									rows = rows.map((row) => {
										row.selected = false;
										return row;
									});
									selected = true;
								}}
							>
								{i + 1}
							</Button>
						</Td>
						{#each columns as { field, type, ...column }}
							{#if type === 'checkbox'}
								<Td
									on:click={() =>
										(rows = rows.map((row) => {
											row.selected = false;
											return row;
										}))}
								>
									<Checkbox
										bind:checked={row[field]}
										class="mx-auto"
										readonly={column?.isReadonly ? 'readonly' : undefined}
									/>
								</Td>
							{:else if type === 'dateTime'}
								<Td readonly={column?.isReadonly ? 'readonly' : undefined}>
									{row[field] === ''
										? ''
										: DateTime.fromJSDate(row[field]).toFormat('M/d/yy @ h:mm:ss a')}
								</Td>
							{:else if type === 'select' && column?.options !== undefined}
								<Td class="p-0">
									<Select
										bind:value={row[field]}
										class="w-full bg-transparent text-current ring-offset-neutral-400 focus:z-[1] dark:bg-transparent dark:text-current dark:ring-offset-neutral-400"
										options={column.options}
										readonly={column?.isReadonly ? 'readonly' : undefined}
									/>
								</Td>
							{:else}
								<Td
									class="p-0 focus-within:border-blue-500"
									on:click={() =>
										(rows = rows.map((row) => {
											row.selected = false;
											return row;
										}))}
								>
									<Input
										bind:value={row[field]}
										class="w-full bg-transparent text-current ring-offset-neutral-400 read-only:bg-neutral-300 focus:z-[1] dark:bg-transparent dark:text-current dark:ring-offset-neutral-400 read-only:dark:bg-neutral-300"
										readonly={column?.isReadonly ? 'readonly' : undefined}
									/>
								</Td>
							{/if}
						{/each}
					</Tr>
				{/each}
			</Tbody>
		</Table>
	</Card>
{/if}
