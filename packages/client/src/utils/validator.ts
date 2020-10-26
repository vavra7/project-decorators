import { validate } from 'class-validator';

type FormattedErrors = { [key: string]: string[] };

export async function validator(form: object): Promise<{}> {
  const formattedErrors: FormattedErrors = {};
  const validationErrors = await validate(form);
  validationErrors.forEach(err => {
    const errorMessages: string[] = [];
    for (const key in err.constraints) {
      errorMessages.push(err.constraints[key]);
    }
    formattedErrors[err.property] = errorMessages;
  });
  return formattedErrors;
}
