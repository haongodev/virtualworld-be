import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import MyAvatar from '../../components/MyAvatar';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavbarAccount({ isCollapse }) {
  const {user} = useAuth();
  return (
    <Link underline="none" color="inherit"  href="/management/account" component={NextLink}>
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            admin
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
