import { Language } from '../enums';
import translations from '../translations';
import { BindThis } from './BindThis';

interface I18nOptions<T extends string> {
  defaultLang: T;
  translations: object;
}

class I18n<T extends string> {
  public lang: T;
  private translations: any;

  constructor(i18nOptions: I18nOptions<T>) {
    this.lang = i18nOptions.defaultLang;
    this.translations = i18nOptions.translations;
  }

  @BindThis()
  public t(path: string): string {
    const keysArray = path.split('.');
    const translation = keysArray.reduce(
      (object, key) => (object && object[key]) || null,
      this.translations[this.lang]
    );
    if (!translation) {
      console.warn('Did not find "%s" translation for path: "%s".', this.lang, path);
      return path;
    } else {
      return translation;
    }
  }
}

export const i18n = new I18n<Language>({
  defaultLang: Language.Cs,
  translations
});

export const t = i18n.t;
