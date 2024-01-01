import { createPageServer } from '$components/DataTable';

const { actions, load } = await createPageServer('Branch');

export { actions, load };
