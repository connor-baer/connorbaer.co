import PropTypes from 'prop-types';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import { animations, breakpoints, colors, fonts } from '../styles';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Meta = ({ children, title = '', index = true, follow = true }) => (
  <div>
    <Head>
      <title>{`${title} | Connor Bär`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="robots"
        content={`${index ? 'index' : 'noindex'}, ${follow
          ? 'follow'
          : 'nofollow'}`}
      />
      <link rel="icon" type="image/png" href="/static/favicon.png" />
    </Head>
    {children}

    {/* global styles */}
    <style jsx global>{`
      /* Font faces */
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 300;

        src: local('Overpass Light'), local('Overpass-Light'),
          url(https://fonts.gstatic.com/s/overpass/v1/tgqY5qOfB6w1HP32JTSrLIgp9Q8gbYrhqGlRav_IXfk.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 400;

        src: local('Overpass Regular'), local('Overpass-Regular'),
          url(https://fonts.gstatic.com/s/overpass/v1/o3S9a2vetxRRO8sKA6PL03YhjbSpvc47ee6xR_80Hnw.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 700;

        src: local('Overpass Bold'), local('Overpass-Bold'),
          url(https://fonts.gstatic.com/s/overpass/v1/z_QV2-z5a6o4brQE8JEVyogp9Q8gbYrhqGlRav_IXfk.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }

      @font-face {
        font-family: 'Overpass Mono';
        font-style: normal;
        font-weight: 400;

        src: local('Overpass Mono Regular'), local('OverpassMono-Regular'),
          url(https://fonts.gstatic.com/s/overpassmono/v2/MarHoIqW2hy_po97b_wS9nn3cbdKJftHIk87C9ihfO8.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }

      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 400;

        src: local('Lora Regular'), local('Lora-Regular'),
          url(https://fonts.gstatic.com/s/lora/v10/rAXKWvABQNHjPUk26ixVvvesZW2xOQ-xsNqO47m55DA.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Lora';
        font-style: italic;
        font-weight: 400;

        src: local('Lora Italic'), local('Lora-Italic'),
          url(https://fonts.gstatic.com/s/lora/v10/_MYF_5lLoOGnzKiQsUc_vevvDin1pK8aKteLpeZ5c0A.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }
      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 700;

        src: local('Lora Bold'), local('Lora-Bold'),
          url(https://fonts.gstatic.com/s/lora/v10/mlTYdpdDwCepOR2s5kS2CwLUuEpTyoUstqEm5AMlJo4.woff2)
            format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
      }

      /* Base resets */
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        font-size: 100%;
        vertical-align: baseline;
      }

      /* HTML5 display-role reset for older browsers. */
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        display: block;
      }

      html {
        @media (max-width: ${breakpoints.small}) {
          font-size: 87.5%;
        }

        @media (min-width: ${breakpoints.wide}) {
          font-size: 125%;
        }

        transition: background-color ${animations.short},
          color ${animations.short};
        background-color: ${colors.gray[8]};
        color: ${colors.gray[9]};
        font-family: ${fonts.family.sans};
        word-wrap: break-word;
        box-sizing: border-box;
      }

      *,
      *::before,
      *::after {
        /* Inherit box-sizing to make it easier to change the property for components that leverage other behavior; see http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/. */
        box-sizing: inherit;
      }

      body {
        position: relative;
        max-width: 100vw;
        min-height: 100vh;
        transition: background-color ${animations.short};
        background-color: ${colors.white};
        overflow-x: hidden;
      }

      a {
        border: 0;
        color: inherit;
        text-decoration: none;
      }

      ol,
      ul {
        list-style: none;
      }

      blockquote,
      q {
        quotes: none;
      }

      blockquote::before,
      blockquote::after,
      q::before,
      q::after {
        content: '';
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      hr {
        margin-top: 1rem;
        margin-bottom: 1.25rem;
        =: 0;

        &::before {
          display: block;
          height: 2px;
          =: ${colors.gray[3]};
          =: '';
        }
      }

      textarea {
        resize: vertical;
      }

      dfn,
      i,
      em,
      .em {
        font-style: italic;
      }

      code,
      kbd,
      tt,
      var,
      samp,
      pre {
        font-family: ${fonts.family.mono};
      }

      /* loading progress bar styles */
      #nprogress {
        pointer-events: none;

        & .bar {
          background: ${colors.primary};
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }

        & .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${colors.primary}, 0 0 5px ${colors.primary};
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }
      }
    `}</style>
  </div>
);

Meta.propTypes = {
  title: PropTypes.string,
  index: PropTypes.bool,
  follow: PropTypes.bool
};

export { Meta };
