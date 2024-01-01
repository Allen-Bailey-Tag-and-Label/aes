import { createPageServer } from '$components/DataTable';

const { actions, load } = await createPageServer('Product');

export { actions, load };
