export type Column = {
	label: string;
	field: string;
	isReadonly?: boolean;
	isUseDefault?: boolean;
	options?: { label: string; value: string }[];
	type?: string;
};
export type Options = {
	columnMerges?: Map<string, { [key: string]: any }>;
	schemaFilterKeys?: string[];
};
