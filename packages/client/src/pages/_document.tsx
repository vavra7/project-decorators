import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';
import { i18n } from '../utils';

class CustomDocument extends Document {
  public render(): ReactElement {
    return (
      <Html lang={i18n.lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
