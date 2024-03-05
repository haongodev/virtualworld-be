"use client"
import React from 'react'
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Container, Typography } from '@mui/material';
import LoginForm from '../../Form/Login';
import useResponsive from '@/src/backend/hooks/useResponsive';
import NextLink from 'next/link';
import CustomImage from '../../Image';
import Image from 'next/image';
import useSettings from '@/src/backend/hooks/useSettings';



const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
}));
  
  const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(7, 5, 0, 7),
    },
}));
  
const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));
  
const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
}));

export default function Login() {
    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const { themeMode } = useSettings();
    const logo_link = process.env.NEXT_PUBLIC_URL+"/logo/logo_"+themeMode+".svg";
    return (
        <RootStyle>
            <HeaderStyle>
                <Image src={logo_link} alt={"Ecommflex"} width={100} height={50}/>
                {smUp && (
                <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                    Don’t have an account? {''}
                    <NextLink href='/register' passHref>
                    <Link variant="subtitle2">Get started</Link>
                    </NextLink>
                </Typography>
                )}
            </HeaderStyle>

            {mdUp && (
                <SectionStyle>
                <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                    Hi, Welcome Back
                </Typography>
                <CustomImage
                        src="https://minimals.cc/assets/illustrations/illustration_dashboard.png"
                        alt="login" ratio={undefined} sx={undefined}/>
                </SectionStyle>
            )}

            <Container maxWidth="sm">
                <ContentStyle>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Minimal
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                    </Box>
                </Stack>

                <Alert severity="info" sx={{ mb: 3 }}>
                    Use email : <strong>admin@gmail.com</strong> / password :<strong> 1234567</strong>
                </Alert>

                <LoginForm />

                {!smUp && (
                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don’t have an account?{' '}
                    <NextLink href='register' passHref>
                        <Link variant="subtitle2">Get started</Link>
                    </NextLink>
                    </Typography>
                )}
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}
