/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  ComponentsProvider,
  Theme,
  Align,
  LoadingBar,
  BaseStyles,
} from '@madebyconnor/bamboo-ui';

import { standard } from '../styles/themes';
import { PreviewContext } from '../components/PreviewContext';
import Link from '../components/Link';
import Image from '../components/Image';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));

    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
  }, []);

  const theme = getTheme(Component);

  return (
    <PreviewContext.Provider value={pageProps.preview}>
      <ComponentsProvider value={{ Head, Image, Link, Align }}>
        <Theme theme={theme}>
          <BaseStyles />
          <LoadingBar isLoading={isLoading} />
          <Component {...pageProps} />
        </Theme>
      </ComponentsProvider>
    </PreviewContext.Provider>
  );
}

function getTheme(Component) {
  if (Component.theme) {
    return Component.theme;
  }
  // For MDX pages, adapted from:
  // https://github.com/mdx-js/mdx/issues/382#issuecomment-523014913
  if (Component.isMDXComponent) {
    return Component({}).props.originalType.theme || standard;
  }
  return standard;
}
