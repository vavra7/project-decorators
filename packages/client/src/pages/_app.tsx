import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import { ReactElement } from 'react';
import '../styles/main.scss';
import { apolloClient } from '../utils';

class CustomApp extends App {
  public render(): ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

export default CustomApp;
