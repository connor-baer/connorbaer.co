import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/tag';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  Anchor
} from '@madebyconnor/bamboo-ui';

import components from './_components';
import Navigation from '../components/Navigation';

import { SITE_NAME, SITE_TWITTER } from '../constants';
import { BASE_URL } from '../constants/paths';

function Article({ children, title, subtitle, slug }) {
  const url = `${BASE_URL}/${slug}`;
  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        url={url}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation />
      <Main>
        <article>
          <Grid>
            <Row>
              <Col
                span={{ default: 12, mega: 10, afterTera: 8 }}
                skip={{ default: 0, mega: 1, afterTera: 2 }}
              >
                <Header title={title} subtitle={subtitle} />
                <MDXProvider components={components}>{children}</MDXProvider>
              </Col>
            </Row>
          </Grid>
        </article>
      </Main>
      <Prefooter
        text={'Let’s be friends.'}
        linkLabel={'Say hi!'}
        linkUrl={`https://twitter.com/${SITE_TWITTER}`}
      />
      <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER}>
        <Anchor href="/disclaimer">Disclaimer</Anchor>
      </Footer>
    </>
  );
}

Article.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  slug: PropTypes.string,
  children: PropTypes.element
};

export default Article;