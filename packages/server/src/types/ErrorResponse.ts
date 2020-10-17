import { FormattedError } from './FormattedError';

export type ErrorResponse = {
  errors: FormattedError[];
  data?: null;
};
