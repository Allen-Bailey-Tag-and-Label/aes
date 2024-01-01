import { theme } from 'sveltewind/stores';
import { sveltewind } from 'sveltewind/themes';
import { twMerge } from 'tailwind-merge';

theme.set(sveltewind);

const input =
	'disabled:bg-transparent disabled:hover:ring-offset-black disabled:focus:ring-offset-black text-black dark:text-black ring-offset-black hover:ring-offset-blue-500 focus:ring-offset-blue-500 focus:ring-blue-500/30 dark:ring-offset-black dark:hover:ring-offset-blue-500 dark:focus:ring-offset-blue-500 dark:focus:ring-blue-500/30 bg-white dark:bg-white rounded-none p-1';

theme.set({
	button:
		'rounded-none bg-transparent px-2 py-1 text-black shadow-none hover:bg-blue-300 focus:bg-blue-300 focus:ring-blue-300/30',
	buttonIcon: 'px-1',
	card: 'bg-neutral-200 dark:bg-neutral-200 rounded-none ring-1 ring-black shadow-none dark:shadow-none dark:ring-black text-black dark:text-black p-2',
	checkbox: twMerge(
		input,
		'p-0 peer-focus:ring-offset-blue-500 dark:peer-focus:ring-offset-blue-500 peer-focus:ring-blue-500/30 dark:peer-focus:ring-blue-500/30'
	),
	checkboxChecked: 'bg-white dark:bg-white',
	header: 'bg-teal-600 dark:bg-teal-600 py-[.25rem]',
	input,
	option: 'rounded-none',
	nav: 'overflow-visible flex-row',
	select: twMerge(input),
	table: 'bg-white dark:bg-white shadow-none dark:shadow-none border-neutral-400 border-t border-l',
	td: 'text-current border-neutral-400 border-b border-r p-1 font-normal',
	th: 'bg-white dark:bg-white text-black dark:text-black border-neutral-400 border-b border-r p-1 font-normal',
	tr: 'even:bg-transparent dark:even:bg-transparent hover:bg-transparent hover:even:bg-transparent dark:hover:bg-transparent dark:hover:even:bg-transparent'
});

export { theme };
