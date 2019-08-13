import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  CoverImage,
  Heading,
  Paragraph,
  useTheme
} from '@madebyconnor/bamboo-ui';

import Link from '../../Link';
import PostMeta from '../PostMeta';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 755px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 620px`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.zetta};

  ${theme.mq.kilo} {
    margin-bottom: 72px;
  }
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.kilo};
`;

const Title = styled(Heading)(titleStyles);

export default function PreviewLarge({
  url,
  image = {},
  title,
  description,
  date,
  category,
  featured = false
}) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={url}>
        <a>
          {featured && image.src && (
            <CoverImage {...image} sizes={sizes} aspectRatio={350 / 150} />
          )}
          <Title size="tera">{title}</Title>
          {description && <Paragraph>{description}</Paragraph>}
        </a>
      </Link>
      <PostMeta date={date} category={category} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewLarge.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  featured: PropTypes.bool,
  category: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    colors: PropTypes.array,
    alt: PropTypes.string
  })
};
