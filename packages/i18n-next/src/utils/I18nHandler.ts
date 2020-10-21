export class I18nHandler<T extends string = any> {
  public _locale: T;

  get locale(): T {
    return this._locale;
  }

  public setLocale(locale: T): void {
    this._locale = locale;
  }

  public t(): string {
    return 'Here some string!';
  }
}
