/** Lowercase, non-alphanumerics collapsed to single hyphens. Used for the
 *  project filter values, which have to agree between the chips that set the
 *  filter and the cards that are filtered. */
export const slug = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
