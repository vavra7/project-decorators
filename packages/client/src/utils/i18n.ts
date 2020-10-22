import { Language } from '@project-decorators/shared';

interface I18nOptions<T extends string> {
  defaultLocale: T;
}

class I18n<T extends string> {
  public locale: T;

  constructor(i18nOptions: I18nOptions<T>) {
    this.locale = i18nOptions.defaultLocale;
  }

  public t(): string {
    return 'Here some string!';
  }
}

export const i18n = new I18n<Language>({
  defaultLocale: Language.Cs
});

export const t = i18n.t;
