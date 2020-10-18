import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';
import { apolloClient } from '../utils';

class CustomApp extends App {
  public render(): ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

export default CustomApp;
