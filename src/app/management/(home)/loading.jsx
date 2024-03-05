import React from 'react'
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';

export default function Loading() {
  return (
    <Container maxWidth="md">
      <Grid spacing={3} sx={{ minHeight: '80vh',display:'flex' }} alignItems="center">
        <LinearProgress sx={{ width:'100%' }}/>
      </Grid>
    </Container>
  );
}