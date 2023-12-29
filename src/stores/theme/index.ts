import { theme } from 'sveltewind/stores';
import { sveltewind } from 'sveltewind/themes';

theme.set(sveltewind);

theme.set({
	header: 'bg-teal-700 dark:bg-teal-700 py-[.25rem]'
});

export { theme };
