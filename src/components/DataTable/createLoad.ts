import { type Column, type Options } from './types';

const createLoad = async (
	schema: {
		[key: string]: any;
	},
	options: Options
) => {
	const load = async () => {
		const { columnMerges, schemaFilterKeys } = options;
		const relationFields = Object.keys(schema).filter(
			(field) =>
				schema[field]?.relationFromFields !== undefined &&
				schema[field]?.relationFromFields?.length !== 0
		);
		const columns: Column[] = await Promise.all(
			Object.keys(schema)
				.filter(
					(field) =>
						schemaFilterKeys !== undefined &&
						!schemaFilterKeys.includes(field) &&
						!relationFields.includes(field)
				)
				.map(async (field) => {
					const label = field.charAt(0).toUpperCase() + field.slice(1);
					if (schema[field].type === 'Boolean')
						return {
							label,
							field,
							type: 'checkbox',
							...(columnMerges?.has(field) ? columnMerges.get(field) : {})
						};
					if (schema[field].type === 'DateTime')
						return {
							label,
							field,
							type: 'dateTime',
							...(columnMerges?.has(field) ? columnMerges.get(field) : {})
						};

					return { label, field, ...(columnMerges?.has(field) ? columnMerges.get(field) : {}) };
				})
		);
		return {
			columns
		};
	};

	return { load };
};

export { createLoad };
