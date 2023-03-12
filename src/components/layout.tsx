import { styled } from '@mui/material/styles';
import React from 'react';
import Header from './header';

const LayoutContainer = styled('div')({
  paddingBottom: '48px',
});

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <LayoutContainer>
    <Header />
    <div>{children}</div>
  </LayoutContainer>
);

export default Layout;
