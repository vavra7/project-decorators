import { validateOrReject } from 'class-validator';
import { ArgumentValidationError } from '../errors';

export async function validateInput(data: any): Promise<void> {
  if (typeof data !== 'object') {
    return data;
  }
  try {
    await validateOrReject(data);
  } catch (err) {
    throw new ArgumentValidationError(err);
  }
}
