import { createPageServer } from '$components/DataTable';
import { prisma } from '$lib/prisma';

const rows = await prisma.branch.findMany();
const branchIdOptions = rows.map((row) => ({ label: row.branch, value: row.id }));

const { actions, load } = await createPageServer('WorkCenter', {
	columnMerges: new Map([
		['branchId', { label: 'Branch', options: branchIdOptions, type: 'select' }],
		['dateCreated', { isReadonly: true, isUseDefault: true }],
		['dateModified', { isReadonly: true }]
	])
});

export { actions, load };
