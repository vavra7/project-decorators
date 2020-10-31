type NonNullableItems<T> = { [K in keyof T]-?: NonNullable<T[K]> };

export type DefaultProps<P, I extends keyof P> = Pick<NonNullableItems<P>, I>;
