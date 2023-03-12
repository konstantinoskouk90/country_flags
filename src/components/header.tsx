import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderOuterContainer = styled('header')(({ theme }) => ({
  backgroundColor: theme.palette.tertiary.main,
  boxShadow: `1px 2px 4px -2px ${theme.palette.secondary.main}`,
  lineHeight: '72px',
  minHeight: '72px',
  margin: '0 auto',
  position: 'relative',
  width: '100%',
}));

const HeaderInnerContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'space-between',
  padding: '0 48px',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const Title = styled('section')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.primary.main,
  display: 'flex',
  fontSize: '18px',
  fontWeight: 800,
  justifyContent: 'flex-start',
}));

const Header: React.FC = () => {
  return (
    <HeaderOuterContainer>
      <HeaderInnerContainer>
        <StyledLink to="/">
          <Title>Where in the world?</Title>
        </StyledLink>
      </HeaderInnerContainer>
    </HeaderOuterContainer>
  );
};

export default Header;
