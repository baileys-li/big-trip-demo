type CamelCase<T extends string> = T extends `${infer Head}_${infer Tail}`
	? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
	: Lowercase<T>;

type CamelizeObject<T extends object> = {
	[K in keyof T & string as CamelCase<K>]: T[K];
};

export type { CamelCase, CamelizeObject };
