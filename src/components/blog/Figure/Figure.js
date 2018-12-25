import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { values } from 'lodash/fp'
import { Text } from '@sumup/circuit-ui'

import { ALIGNMENTS } from '../../../constants'
import Align from '../Align'
import Image from '../../Image'

const captionStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacings.giga};
  color: ${theme.colors.n700};
`

const Caption = styled(Text)(captionStyles)

function Figure({ caption, align, image }) {
  const { src, srcSet, alt } = image

  if (!src) {
    return null
  }

  return (
    <Align align={align}>
      <Image src={src} srcSet={srcSet} alt={alt} />
      {caption && (
        <Caption element="figcaption" size={Text.KILO} noMargin>
          {caption}
        </Caption>
      )}
    </Align>
  )
}

Figure.RIGHT = ALIGNMENTS.RIGHT
Figure.LEFT = ALIGNMENTS.LEFT
Figure.CENTER = ALIGNMENTS.CENTER
Figure.FULL = ALIGNMENTS.FULL

Figure.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  align: PropTypes.oneOf(values(ALIGNMENTS)),
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    alt: PropTypes.string
  })
}

Figure.defaultProps = {
  align: ALIGNMENTS.LEFT,
  image: {}
}

/**
 * @component
 */
export default Figure
