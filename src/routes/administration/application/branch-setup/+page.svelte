<script lang="ts">
	import { DataTable } from '$components';

	// props (internal)
	let columns = [
		{ label: 'Branch', field: 'branch' },
		{ label: 'Description', field: 'description' },
		{ label: 'Address1', field: 'address1' },
		{ label: 'Address2', field: 'address2' },
		{ label: 'City', field: 'city' },
		{ label: 'State', field: 'state' },
		{ label: 'ZipCode', field: 'zipCode' },
		{ label: 'Country', field: 'country' },
		{ label: 'Phone', field: 'phone' },
		{ label: 'Fax', field: 'fax' },
		{ label: 'Contact', field: 'contact' },
		{ label: 'Email', field: 'email' },
		{ label: 'Active', field: 'active', type: 'checkbox' }
	];
</script>

<DataTable {columns} />
