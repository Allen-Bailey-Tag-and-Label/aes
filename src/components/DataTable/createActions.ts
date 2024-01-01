import { getSchema, prisma } from '$lib/prisma';
import { fail } from '@sveltejs/kit';

export const createActions = (modelName: string) => {
	const schema = getSchema(modelName);

	if (schema === undefined) return { actions: {} };

	const actions = {
		delete: async ({ request }) => {
			const formData = await request.formData();
			const id = formData.get('id');
			if (id === null || id === undefined) return fail(400, { error: 'Missing id' });
			await prisma[modelName].delete({ where: { id } });
			return {};
		},
		find: async ({ request }) => {
			const formData = await request.formData();
			const branch = formData.get('branch');
			if (branch === null) return fail(400, { error: 'Missing Branch' });
			let rows;
			if (branch === '') rows = await prisma[modelName].findMany();
			if (branch !== '') rows = await prisma[modelName].findMany({ where: { branch: +branch } });
			return { rows };
		},
		save: async ({ request }) => {
			const formData = await request.formData();
			const rows = formData.get('rows');
			if (rows === null) return fail(400, { error: 'Missing Rows' });
			await Promise.all(
				JSON.parse(rows).map(async (row) => {
					let { id, ...data } = row;
					Object.keys(data).map((key) => {
						if (schema[key].type === 'Boolean') data[key] = data[key] === true ? true : false;
						if (schema[key].type === 'Float') data[key] = parseFloat(data[key]) || 0;
						if (schema[key].type === 'Int') data[key] = +data[key];
					});
					if (id === null) await prisma[modelName].create({ data });
					if (id !== null)
						await prisma[modelName].update({
							where: {
								id
							},
							data
						});
				})
			);
			return {};
		}
	};

	return { actions };
};
