import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';
import { apolloClient } from '../utils';

class CustomApp extends App {
  // public static async getInitialProps(context: any) {
  //   const isServer: boolean = typeof window === 'undefined';
  //   if (isServer && context.ctx.res.context) {
  //     console.log(context.ctx.res.context.name);
  //     context.ctx.res.writeHead(303, { Location: '/login' });
  //     context.ctx.res?.end();
  //   }
  //   // console.log(context.ctx.res.context);
  //   const appProps = await App.getInitialProps(context);
  //   return { ...appProps };
  // }

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
