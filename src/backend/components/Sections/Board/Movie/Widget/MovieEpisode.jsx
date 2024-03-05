import Iconify from '@/src/backend/components/Iconify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React,{useCallback} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import RHFTextField from '@/src/backend/components/Form/HookForm/RHFTextField';
import RHFSelect from '@/src/backend/components/Form/HookForm/RHFSelect';
import { RHFUploadSingleFile } from '@/src/backend/components/Form/HookForm/RHFUpload';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow:"auto",
    width: 400,
    height: "70vh",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
};

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export default function MovieEpisode({episodes,setValue,handleDrop}) {
    const handleAddServer = (index) => {
        const serverData = {
            id:uuidv4(),
            id_movie:null,
            name:'',
            is_upload:false,
            stream:'',
            source:'',
        }
        const arrServerData = episodes[index].server
        arrServerData.push(serverData);
        setValue(`episodes[${index}].server`,arrServerData)
    }
    const handleAddEpisode = () => {
        const episodeData = {
            id:uuidv4(),
            id_movie:null,
            name:'',
            slug:'',
            server:[],
        }
        episodes.push(episodeData)
        setValue(`episodes`,episodes)
    }

    return (
        <Box sx={{ ...modalStyle, width: "100vh" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} textAlign="right">
                    <Button variant="contained" color='primary' startIcon={<Iconify icon="eva:plus-fill" sx={undefined} />} onClick={handleAddEpisode}>
                        Add Episode
                    </Button>
                </Grid>
                {
                    episodes.map((episode,index) => 
                        <Grid item xs={12} md={4} key={episode.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<Iconify icon="ic:round-expand-more" sx={undefined} />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    {
                                        episode.slug === '' ? 
                                        <RHFTextField size="small" name={`episodes[${index}].name`} label="Episode Name" />
                                        : episode.name
                                    }
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        episode.server.map((item,key) => {
                                            return (
                                                <Accordion key={item.id} >
                                                    <AccordionSummary
                                                        expandIcon={<Iconify icon="ic:round-expand-more" sx={undefined} />}
                                                        aria-controls="panel3-content"
                                                        id="panel3-header"
                                                    >
                                                        Server Name {key + 1}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Grid container key={item.id} sx={{mb:3}}>
                                                            <Grid item xs={12} md={12} sx={{mb:3}}>
                                                                <RHFSelect name={`episodes[${index}].server[${key}].is_upload`} label="Property">
                                                                    <option value="true">
                                                                        Upload
                                                                    </option>
                                                                    <option value="false">
                                                                        Embed
                                                                    </option>
                                                                </RHFSelect>
                                                            </Grid>
                                                            { !item.is_upload || item.is_upload == "false" ? 
                                                                <Grid container spacing={3} key={item.id} sx={{mb:3}}>
                                                                    <Grid item xs={12}>
                                                                        <RHFTextField name={`episodes[${index}]server[${key}].name`} label="Server Name" />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <RHFTextField name={`episodes[${index}]server[${key}].stream`} label="Stream Url" />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <RHFTextField name={`episodes[${index}]server[${key}].source`} label="Source M3U8" />
                                                                    </Grid>
                                                                </Grid>
                                                                :
                                                                <Grid item xs={12} md={12}>
                                                                    <LabelStyle>Video</LabelStyle>
                                                                    <RHFUploadSingleFile type="video" name={`server[${key}].source`} accept="video/*" maxSize={3145728} onDrop={handleDrop(`episodes[${index}]server[${key}].source`)} />
                                                                </Grid>
                                                            }
                                                        </Grid>
                                                    </AccordionDetails>
                                                    <AccordionActions>
                                                        <Button color='error'>Delete</Button>
                                                    </AccordionActions>
                                                </Accordion>
                                            )
                                        })
                                    }
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button color='success' onClick={() => handleAddServer(index)}>Add Server</Button>
                                    <Button color='error'>Delete</Button>
                                </AccordionActions>
                            </Accordion>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}
