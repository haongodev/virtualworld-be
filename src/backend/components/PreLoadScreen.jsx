import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import useSettings from '../hooks/useSettings';
import { LazyMotion, domMax, m } from 'framer-motion';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    right: 0,
    bottom: 0,
    zIndex: 99999,
    width: '100%',
    height: '100%',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function PreLoadScreen() {
    const { themeMode } = useSettings();
    let logo_link = process.env.NEXT_PUBLIC_URL + "/logo/logo_preload_" + themeMode + '.svg';

    return (
        <LazyMotion strict features={domMax}>
            <RootStyle>
                <m.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 360 }}
                    transition={{
                        duration: 2,
                        ease: 'easeInOut',
                        repeatDelay: 1,
                        repeat: Infinity,
                    }}
                >
                    <Image src={logo_link} alt={"Ecommflex"} width={100} height={100} />
                </m.div>

                <Box
                    component={m.div}
                    animate={{
                        scale: [1.2, 1, 1, 1.2, 1.2],
                        rotate: [270, 0, 0, 270, 270],
                        opacity: [0.25, 1, 1, 1, 0.25],
                        borderRadius: ['25%', '25%', '50%', '50%', '25%'],
                    }}
                    transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '25%',
                        position: 'absolute',
                        border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
                    }}
                />

                <Box
                    component={m.div}
                    animate={{
                        scale: [1, 1.2, 1.2, 1, 1],
                        rotate: [0, 270, 270, 0, 0],
                        opacity: [1, 0.25, 0.25, 0.25, 1],
                        borderRadius: ['25%', '25%', '50%', '50%', '25%'],
                    }}
                    transition={{
                        ease: 'linear',
                        duration: 3.2,
                        repeat: Infinity,
                    }}
                    sx={{
                        width: 140,
                        height: 140,
                        borderRadius: '25%',
                        position: 'absolute',
                        border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
                    }}
                />
            </RootStyle>
        </LazyMotion>
    );
}
