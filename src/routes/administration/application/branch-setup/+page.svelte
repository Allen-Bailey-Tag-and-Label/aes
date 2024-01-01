<script lang="ts">
	import { DataTable } from '$components';

	// props (external)
	export let data;
</script>

<DataTable columns={data.columns} />
