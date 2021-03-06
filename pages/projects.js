import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Main, Header, Columns, styles } from '@madebyconnor/bamboo-ui';

import { getPreview } from '../services/preview';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import { Footer } from '../components/Footer';
import PreviewLarge from '../components/projects/PreviewLarge';
import useProjects from '../hooks/use-projects';

const spacingStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.l};
  margin-bottom: ${theme.spacing.l};

  ${theme.mq.hand} {
    margin-top: ${theme.spacing.xxxl};
    margin-bottom: ${theme.spacing.xxxl};
  }
`;

const StyledColumns = styled(Columns)(spacingStyles);
const StyledHeader = styled(Header)(spacingStyles);

const Grid = styled('div')(styles.pageWidth);

export function getStaticProps(context) {
  return { props: { preview: getPreview(context) } };
}

export default function ProjectsHome() {
  const [projects] = useProjects();
  const title = 'Selected Work';
  const subtitle = 'Make technology human.';

  return (
    <>
      <Meta title={title} description={subtitle} pathname={'projects'} />
      <Navigation />
      <Main>
        <Grid>
          <StyledColumns>
            <StyledHeader title={title} subtitle={subtitle} />
            {projects.map((project) => (
              <PreviewLarge key={project.url} url={project.url} {...project} />
            ))}
          </StyledColumns>
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
