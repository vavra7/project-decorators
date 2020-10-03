import { validateOrReject } from 'class-validator';

export async function validateInput(data: any): Promise<void> {
  if (typeof data !== 'object') {
    return data;
  }

  await validateOrReject(data);
}
