import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Main,
  Header,
  ComponentsProvider,
  styles,
} from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import { Footer } from '../components/Footer';
import Align from '../components/Align';
import IntroSection from '../components/projects/IntroSection';

import components from './_components';

const Article = styled('article')(styles.pageWidth, styles.grid);

const headerStyles = (theme) => css`
  grid-column: 1 / 13;

  ${theme.mq.hand} {
    grid-column: 1 / 12;
  }

  ${theme.mq.lap} {
    grid-column: 1 / 11;
  }
`;

const introBriefStyles = (theme) => css`
  grid-column: 1 / 13;

  ${theme.mq.desk} {
    grid-column: 1 / 7;
  }
`;

const introSkillStyles = (theme) => css`
  grid-column: 1 / 7;

  ${theme.mq.desk} {
    grid-column: 7 / 10;
  }
`;

const introClientStyles = (theme) => css`
  grid-column: 7 / 13;

  ${theme.mq.desk} {
    grid-column: 10 / 13;
  }
`;

const contentStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.hand} {
    grid-column: 1 / 12;
  }

  ${theme.mq.lap} {
    grid-column: 3 / 11;
  }
`;

const Content = styled('div')(contentStyles);

// export function getStaticProps(context) {
//   return { props: { preview: getPreview(context) } };
// }

export default function Project({ children, frontMatter }) {
  const {
    title,
    subtitle,
    brief,
    image,
    skills,
    client,
    __resourcePath: pathname,
  } = frontMatter;
  return (
    <>
      <Meta
        title={title}
        description={brief}
        pathname={pathname}
        image={image}
      />
      <Navigation />
      <Main>
        <Article>
          <Header title={title} subtitle={subtitle} css={headerStyles} />

          <IntroSection title="Overview" css={introBriefStyles}>
            {brief}
          </IntroSection>
          <IntroSection title="Involvement" css={introSkillStyles}>
            {skills.map((skill) => (
              <p key={skill}>{skill}</p>
            ))}
          </IntroSection>
          <IntroSection title="Client" css={introClientStyles}>
            {client}
          </IntroSection>

          <Content>
            <ComponentsProvider value={{ Align }}>
              <MDXProvider components={components}>{children}</MDXProvider>
            </ComponentsProvider>
          </Content>
        </Article>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
