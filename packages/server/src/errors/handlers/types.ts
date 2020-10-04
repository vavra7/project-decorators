export type FormattedError = {
  message: string;
  code: string;
  extensions?: any;
};

export type ErrorResponse = {
  errors: FormattedError[];
  data?: null;
};
