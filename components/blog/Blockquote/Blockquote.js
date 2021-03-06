import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Align from '../../Align';

const sharedStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.serif};
  font-style: italic;
  font-size: 24px;
  line-height: 32px;

  ${theme.mq.hand} {
    font-size: 32px;
    line-height: 42px;
  }
`;

const quoteStyles = ({ theme }) => css`
  ${sharedStyles({ theme })};

  > p {
    ${sharedStyles({ theme })};
    margin-bottom: 0;
  }
`;

const Quote = styled('blockquote')(quoteStyles);

const citeStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacing.s};
  color: ${theme.color.neutral[700]};

  &::before {
    display: inline;
    content: '— ';
  }
`;

const Cite = styled('cite')(citeStyles);

export default function Blockquote({
  children,
  cite,
  align = Align.CENTER,
  ...rest
}) {
  return (
    <Align align={align}>
      <Quote {...rest}>{children}</Quote>
      {cite && <Cite>{cite}</Cite>}
    </Align>
  );
}

Blockquote.RIGHT = Align.RIGHT;
Blockquote.LEFT = Align.LEFT;
Blockquote.CENTER = Align.CENTER;
Blockquote.FULL = Align.FULL;

Blockquote.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cite: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  align: PropTypes.oneOf([
    Blockquote.RIGHT,
    Blockquote.LEFT,
    Blockquote.CENTER,
    Blockquote.FULL,
  ]),
};
