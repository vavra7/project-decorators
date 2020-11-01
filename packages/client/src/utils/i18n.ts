import { BindThis } from '../decorators';
import { Language } from '../enums';
import translations from '../translations';

interface I18nOptions<T extends string> {
  defaultLang: T;
  translations: object;
}

type TParams = string[] | { [key: string]: string };

export class I18n<T extends string> {
  public lang: T;
  private translations: any;

  constructor(i18nOptions: I18nOptions<T>) {
    this.lang = i18nOptions.defaultLang;
    this.translations = i18nOptions.translations;
  }

  @BindThis()
  public t(path: string, params?: TParams): string {
    const keysArray = path.split('.');
    const translation = keysArray.reduce(
      (object, key) => (object && object[key]) || null,
      this.translations[this.lang]
    );
    if (!translation) {
      console.warn('Did not find "%s" translation for path: "%s".', this.lang, path);
      return path;
    } else {
      if (typeof translation !== 'string') {
        return JSON.stringify(translation);
      } else {
        return params ? this.embedParams(translation, params) : translation;
      }
    }
  }

  /**
   * Hydrate translated string with params
   */
  private embedParams(translation: string, params: TParams): string {
    let hydratedTranslation = translation;
    for (const key in params) {
      hydratedTranslation = hydratedTranslation.replace(`{${key}}`, (params as any)[key]);
    }
    return hydratedTranslation;
  }
}

export const i18n = new I18n<Language>({
  defaultLang: Language.Cs,
  translations
});

export const t = i18n.t;
