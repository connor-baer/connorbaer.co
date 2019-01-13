import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { hydrate } from 'react-emotion';
import { Theme } from '@madebyconnor/bamboo-ui';

import isServer from '../utils/is-server';
import { getAllCookies } from '../services/cookies';
import * as themes from '../styles/themes';

import { FONTS_PATH } from '../constants/paths';

// Adds server generated styles to emotion cache.
if (!isServer) {
  // eslint-disable-next-line no-underscore-dangle
  hydrate(window.__NEXT_DATA__.emotionIds);
}

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = getAllCookies(ctx);
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { Component, pageProps, cookies };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => {
      NProgress.done();
      objectFitPolyfill();
    });
    Router.events.on('routeChangeError', () => NProgress.done());
  }

  render() {
    const { Component, pageProps, cookies, router } = this.props;
    const section = router.pathname.split('/')[1];
    return (
      <Container>
        <Theme
          cookies={cookies}
          themes={themes}
          initialThemeId={section}
          fontBasePath={FONTS_PATH}
        >
          <Component {...pageProps} cookies={cookies} />
        </Theme>
      </Container>
    );
  }
}
