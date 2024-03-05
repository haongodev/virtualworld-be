import RHFTextField from '@/src/backend/components/Form/HookForm/RHFTextField'
import Grid from '@mui/material/Grid'
import React from 'react'

export default function MovieServer({index}) {
  return (
    <>
        <Grid item xs={12} md={6}>
            <RHFTextField name={`server[${index}].name`} label="Server Name" />
        </Grid>
        <Grid item xs={12} md={6}>
            <RHFTextField name={`server[${index}].stream`} label="Stream Url" />
        </Grid>
        <Grid item xs={12} md={6}>
            <RHFTextField name={`server[${index}].source`} label="Source M3U8" />
        </Grid>
    </>
  )
}
