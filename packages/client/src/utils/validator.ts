import { validate } from 'class-validator';
import { t } from './i18n';

type FormattedErrors = { [key: string]: string[] };

export async function validator(form: any): Promise<{}> {
  const translationPath = form.translationPath;
  const formattedErrors: FormattedErrors = {};
  const validationErrors = await validate(form);
  validationErrors.forEach(err => {
    const errorMessages: string[] = [];
    for (const constraint in err.constraints) {
      const context = err.contexts && err.contexts[constraint];
      const fieldNameTranslation = t(translationPath + err.property).toLowerCase();
      errorMessages.push(
        t(`commons.validations.${constraint}`, {
          ...context,
          name: fieldNameTranslation,
          value: err.value
        })
      );
    }
    formattedErrors[err.property] = errorMessages;
  });
  return formattedErrors;
}
