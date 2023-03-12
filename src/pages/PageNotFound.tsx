import { styled } from '@mui/material';

const NotFoundContainer = styled('section')(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'flex',
  fontWeight: 600,
  height: '100%',
  justifyContent: 'center',
  marginTop: '48px',
  width: '100%',
}));

function PageNotFound() {
  return <NotFoundContainer>Page Not Found</NotFoundContainer>;
}

export default PageNotFound;
