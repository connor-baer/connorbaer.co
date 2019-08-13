import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Main, Header, sharedStyles } from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as guides } from './guides/*.mdx';
import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import Prefooter from '../../components/Prefooter';
import Footer from '../../components/Footer';
import GuidePreview from '../../components/travel/GuidePreview';

import * as Url from '../../services/url';

const Grid = styled('div')(sharedStyles.pageWidth);

const headerStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.mega} {
    width: 90%;
  }

  ${theme.mq.giga} {
    width: 80%;
  }
`;

const StyledHeader = styled(Header)(headerStyles);

const guidesStyles = ({ theme }) => css`
  display: flex;
  flex-wrap: nowrap;

  ${theme.mq.untilMega} {
    scroll-snap-type: x mandatory;
    scroll-padding: 0 ${theme.spacings.tera};
    overflow-x: auto;
    padding: 0;

    &::after {
      content: '';
      display: block;
      width: ${theme.spacings.tera};
      height: ${theme.spacings.tera};
      flex-shrink: 0;
    }
  }

  ${theme.mq.untilKilo} {
    scroll-padding: 0 ${theme.spacings.mega};

    &::after {
      width: ${theme.spacings.mega};
    }
  }
`;

const Guides = styled('div')(sharedStyles.pageWidth, guidesStyles);

const guideStyles = ({ theme }) => css`
  ${theme.mq.untilMega} {
    margin-left: ${theme.spacings.tera};
    scroll-snap-align: start;
    width: 75vw;
    max-width: 21rem;
    flex-shrink: 0;
  }

  ${theme.mq.untilKilo} {
    margin-left: ${theme.spacings.mega};
  }

  ${theme.mq.mega} {
    width: 25%;
    margin-right: ${theme.spacings.tera};

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const StyledGuidePreview = styled(GuidePreview)(guideStyles);

export default function TravelPage() {
  const title = 'Travel guides';
  const subtitle =
    'Follow me around the world, explore bustling cities and discover hidden treasures.'; // eslint-disable-line max-len
  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        url={'travel'}
        image={{
          src: '/static/images/pages/connor.jpg',
          alt: 'Connor Bär smiles at the camera'
        }}
      />
      <Navigation />
      <Main>
        <Grid>
          <StyledHeader title={title} subtitle={subtitle} />
        </Grid>

        <Guides>
          {guides.map(guide => (
            <StyledGuidePreview
              key={guide.title}
              url={Url.format(guide.__resourcePath)}
              {...guide}
            />
          ))}
        </Guides>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
