// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import { UploadIllustration } from '../assets';
import React from 'react';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      useFlexGap 
      flexWrap="wrap"
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5">
          Drop or Select file
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Drop files here or click&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
            browse
          </Typography>
          &nbsp;thorough your machine
        </Typography>
      </Box>
    </Stack>
  );
}
