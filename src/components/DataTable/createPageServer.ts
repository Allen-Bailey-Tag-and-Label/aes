import { createActions } from './createActions';
import { getSchema } from '$lib/prisma';
import { createLoad } from './createLoad';
import { type Options } from './types';

const defaultOptions: Options = {
	columnMerges: new Map(),
	schemaFilterKeys: ['id']
};

export const createPageServer = async (modelName: string, options: Options = {}) => {
	options = Object.assign(defaultOptions, options);
	const schema = getSchema(modelName);
	if (schema === undefined) return;

	const { actions } = createActions(modelName);
	const { load } = await createLoad(schema, options);

	return { actions, load };
};
