export type Assign<P, D> = Exclude<P, keyof D> & D;
