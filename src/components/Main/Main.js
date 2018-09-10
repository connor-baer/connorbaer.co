import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  background-color: ${theme.colors.bodyBg};
  color: ${theme.colors.bodyColor};
  overflow: hidden;
  padding-bottom: ${theme.spacings.zetta};

  ${theme.mq.kilo`
    min-height: calc(100vh - (168px + 57px));
    padding-top: 88px;
  `};
`;

const sidebarStyles = ({ theme, hasSidebar }) =>
  hasSidebar &&
  css`
    width: 100vw;

    ${theme.mq.mega`
      width: calc(100vw - 320px);
    `};
  `;

const Main = styled('main')(baseStyles, sidebarStyles);

Main.propTypes = {
  hasSidebar: PropTypes.bool
};

Main.defaultProps = {
  hasSidebar: false
};

export default Main;