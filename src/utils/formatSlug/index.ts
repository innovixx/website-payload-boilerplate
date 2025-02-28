import type { FieldHook } from 'payload';

export const formatSlug = (val: string): string => val
	.replace(/ /g, '-')
	.replace(/[^\w\-/]+/g, '')
	.toLowerCase();

export const formatSlugValidateHook = (fallback: string): FieldHook => ({ value, originalDoc, data }) => {
	if (typeof value === 'string') {
		return formatSlug(value);
	}

	const fallbackData: unknown = (data?.[fallback]) || (originalDoc?.[fallback]);

	if (typeof fallbackData === 'string') {
		return formatSlug(fallbackData);
	}

	if (typeof value === 'string') {
		return value;
	}
	return '';
};
