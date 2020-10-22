import { Language } from '@project-decorators/shared';
import translations from '../translations';
import { BindThis } from './BindThis';

interface I18nOptions<T extends string> {
  defaultLocale: T;
  translations: object;
}

class I18n<T extends string> {
  public locale: T;
  private translations: any;

  constructor(i18nOptions: I18nOptions<T>) {
    this.locale = i18nOptions.defaultLocale;
    this.translations = i18nOptions.translations;
  }

  @BindThis()
  public t(path: string): string {
    const keysArray = path.split('.');
    const translation = keysArray.reduce((object, key) => {
      return object[key];
    }, this.translations[this.locale]);
    if (!translation) {
      console.warn('Did not find "%s" translation for path: "%s".', this.locale, path);
      return path;
    } else {
      return translation;
    }
  }
}

export const i18n = new I18n<Language>({
  defaultLocale: Language.Cs,
  translations
});

export const t = i18n.t;
