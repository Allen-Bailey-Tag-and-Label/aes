import { createPageServer } from '$components/DataTable';
import { prisma } from '$lib/prisma';

const [branches, products] = await Promise.all([
	prisma.branch.findMany(),
	prisma.product.findMany()
]);
const branchOptions = branches.map((row) => ({ label: row.branch, value: row.id }));
const productOptions = products.map((row) => ({ label: row.code, value: row.id }));

const { actions, load } = await createPageServer('Operation', {
	columnMerges: new Map([
		['branchId', { label: 'Branch', options: branchOptions, type: 'select' }],
		['productId', { label: 'Item2', options: productOptions, type: 'select' }]
	])
});

export { actions, load };
