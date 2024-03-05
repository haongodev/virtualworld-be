"use client"
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect } from '../../../Form/HookForm';
import { PATH_DASHBOARD } from '@/src/backend/routes';
import React from 'react';
import { useRouter } from 'next/navigation';
import '@/src/backend/utils/highlight';
import 'react-quill/dist/quill.snow.css';
import Container from '@mui/material/Container';
import HeaderBreadcrumbs from '../../../HeaderBreadcrumbs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Autocomplete from '@mui/material/Autocomplete';
import useSettings from '@/src/backend/hooks/useSettings';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import NextLink from 'next/link';
import Iconify from '../../../Iconify';
import { quality, subtitle,status } from '@/src/backend/constant';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import MovieEpisode from './Widget/MovieEpisode';
import MovieServer from './Widget/MovieServer';
import { useQuery } from "@tanstack/react-query";
import { getByMovieId } from '@/src/server/api/episodes/getByMovieId';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { v4 as uuidv4 } from 'uuid';
import { createOrUpdate } from '@/src/server/api/movies/createOrUpdate';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function MovieAddOrEditForm({movie,categories,types,countries}) {
    const titlePage = movie ? movie.name : "Add Movie"
    const { themeStretch } = useSettings();
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [openEp, setOpenModalEp] = React.useState(false);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['getEpisodeByMovie'],
        queryFn: () => getByMovieId(movie.id),
        enabled: false,
    })

    const NewMovieSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        origin_name: Yup.string().required('Name origin is required'),
        description: Yup.string().min(300).required('Description is required'),
        content: Yup.string().required('Content is required'),
        thumb_image: Yup.mixed().required('Thumb is required'),
        image: Yup.mixed().required('Poster is required'),
    });
    
    const defaultValues = useMemo(
        () => ({
            id: movie?.id || null,
            name: movie?.name || '',
            origin_name: movie?.origin_name || '',
            description: movie?.description || '',
            content: movie?.summary || '',
            publish_date: movie?.publish_date || new Date(),
            quality: movie?.quality,
            language: movie?.language,
            thumb_image: movie?.thumb_image ? movie.thumb_image.replace("/180x300", "") : null,
            image: movie?.image ? movie.image.replace("/370x220", "") : null,
            trailer_url: movie?.trailer_url || '',
            id_category: movie?.id_category || 1,
            time: movie?.time || '',
            status: movie?.status || 'ongoing',
            is_coppyright:movie?.is_copyright || false,
            sub_docquyen:movie?.sub_docquyen || false,
            is_hot:movie?.is_hot || false,
            is_cinema:movie?.is_cinema || false,
            source_from:movie?.source_from || '',
            movieCountries: (movie?.movieCountries || []).map((item) => item.id_country),
            type: (movie?.type || []).map((item) => item.id_type),
            server:movie?.server || [],
            episodes:[]
        }),
        [movie]
    );

    const methods = useForm({
        resolver: yupResolver(NewMovieSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;
    
    const handleAddServer = () => {
        const serverData = {
            id:uuidv4(),
            id_movie:null,
            name:'',
            is_upload:false,
            stream:'',
            source:'',
        }
        const arrServerData = methods.getValues('server');
        arrServerData.push(serverData);
        setValue('server',arrServerData)
    }
    
    const handleDelServer = (index) => {
        const arrServerData = methods.getValues('server');
        const newArrServerData = [...arrServerData]
        newArrServerData.splice(index, 1);
        setValue('server',newArrServerData);
    }

    const handleCloseModalEp = () => {
        setOpenModalEp(false);
    };

    const handleOpenModalEp = () => {
        setOpenModalEp(true);
        if(methods.getValues('episodes').length === 0 && defaultValues.id !== null){
            refetch().then(({data}) => {
                if(data.success){
                    data.data.sort((a, b) => {
                        const episodeA = parseInt(a.name.match(/\d+/) ? a.name.match(/\d+/)[0] : a.name);
                        const episodeB = parseInt(b.name.match(/\d+/) ? b.name.match(/\d+/)[0] : b.name);
                        return episodeA - episodeB;
                    });
                    setValue('episodes',data.data);
                }
            })
        }
    }

    const values = watch();
    
    const onSubmit = async (data ) => {
        try {
            await createOrUpdate(data)
            reset();
            enqueueSnackbar('Post success!');
            push(`${PATH_DASHBOARD.movies}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (key) => (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    key,
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={titlePage}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Movie List' },
                        { name: titlePage },
                    ]}
                    sx={undefined}
                    action={
                        <>
                        <NextLink href={PATH_DASHBOARD.movies} passHref>
                            <Button variant="contained" color='secondary' startIcon={<Iconify icon="fluent:arrow-left-28-regular" sx={undefined} />} sx={{mr:1}}>
                                Back
                            </Button>
                        </NextLink>
                        {movie ? 
                        <NextLink href={PATH_DASHBOARD.movies} passHref>
                            <Button variant="contained" color='warning' startIcon={<Iconify icon="tabler:edit" sx={undefined} />}>
                                Update Actor
                            </Button>
                        </NextLink>
                        : null}
                        </>
                    }
                />
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3,mb: 3 }}>
                                <Stack spacing={3}>
                                    <RHFTextField name="name" label="Movie Name" />

                                    <RHFTextField name="origin_name" label="Movie Name Original" />

                                    <RHFTextField name="description" label="Meta Description" multiline rows={3} />

                                    <div>
                                        <LabelStyle>Content</LabelStyle>
                                        <RHFEditor name="content" />
                                    </div>
                                </Stack>
                            </Card>
                            
                            <Card sx={{ p: 3 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={3}>
                                        <LabelStyle>Thumbnail</LabelStyle>
                                        <RHFUploadSingleFile name="thumb_image" accept="image/*" maxSize={3145728} onDrop={handleDrop('thumb_image')} />
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <LabelStyle>Poster</LabelStyle>
                                        <RHFUploadSingleFile name="image" accept="image/*" maxSize={3145728} onDrop={handleDrop('image')} />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3,mb: 3 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <RHFSelect name="quality" label="Quality">
                                            {quality.map((qlt,i) => (
                                                <option key={i} value={qlt}>
                                                    {qlt}
                                                </option>
                                            ))}
                                        </RHFSelect>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <RHFSelect name="language" label="Subtitle">
                                            {subtitle.map((sub,i) => (
                                                <option key={i} value={sub}>
                                                    {sub}
                                                </option>
                                            ))}
                                        </RHFSelect>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={6}>
                                        <RHFSelect name="status" label="Status">
                                            {status.map((stt,i) => (
                                                <option key={i} value={stt}>
                                                    {stt}
                                                </option>
                                            ))}
                                        </RHFSelect>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <MobileDatePicker sx={{width:"100%"}} name="publish_date" label="Publish Date" value={new Date(values.publish_date)} /> 
                                    </Grid>

                                    
                                    <Grid item xs={6} md={3}>
                                        <RHFSwitch
                                            name="is_copyright"
                                            label="Is CopyRight"
                                            labelPlacement="top"
                                            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={3}>
                                        <RHFSwitch
                                            name="sub_docquyen"
                                            label="Sub Monopoly"
                                            labelPlacement="top"
                                            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={6} md={3}>
                                        <RHFSwitch
                                            name="is_hot"
                                            label="Hot Movie"
                                            labelPlacement="top"
                                            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                                        />
                                    </Grid>

                                    <Grid item xs={6} md={3}>
                                        <RHFSwitch
                                            name="is_cinema"
                                            label="Cinema Movie"
                                            labelPlacement="top"
                                            sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <RHFTextField name="time" label="Time" />
                                    </Grid>
                                    
                                    <Grid item xs={12} md={6}>
                                        <RHFTextField name="trailer_url" label="Trailer" />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <RHFTextField name="source_from" label="Source Movie" />
                                    </Grid>
                                                
                                    <Grid item xs={12} md={6}>
                                        <Controller
                                            name="movieCountries"
                                            control={control}
                                            render={({ field }) => (
                                                <Autocomplete
                                                {...field}
                                                id="type-autocomplete"
                                                multiple
                                                onChange={(event, newValue) => field.onChange(newValue)}
                                                options={countries.map((item) => item.id)}
                                                getOptionLabel={(option) => countries.filter((item) => item.id === option)[0].name }
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => {
                                                        let optionItem = option;
                                                        if(!option.hasOwnProperty('id')){
                                                            optionItem = countries.filter((item) => item.id === option)[0];
                                                        }
                                                        return <Chip {...getTagProps({ index })} key={optionItem.id} size="small" label={optionItem.name}/>
                                                    })
                                                }
                                                renderInput={(params) => <TextField label="Country" {...params} />}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} md={6}>
                                        <Controller
                                            name="type"
                                            control={control}
                                            render={({ field }) => (
                                                <Autocomplete
                                                {...field}
                                                id="type-autocomplete"
                                                multiple
                                                onChange={(event, newValue) => field.onChange(newValue)}
                                                options={types.map((item) => item.id)}
                                                getOptionLabel={(option) => types.filter((item) => item.id === option)[0].name }
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => {
                                                        let optionItem = option;
                                                        if(!option.hasOwnProperty('id')){
                                                            optionItem = types.filter((item) => item.id === option)[0];
                                                        }
                                                        return <Chip {...getTagProps({ index })} key={optionItem.id} size="small" label={optionItem.name}/>
                                                    })
                                                }
                                                renderInput={(params) => <TextField label="Type" {...params} />}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    
                                    
                                    <Grid item xs={12} md={6}>
                                        <RHFSelect name="id_category" label="Category" disabled={ defaultValues.id !== null ? true : false }>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </RHFSelect>
                                    </Grid>

                                </Grid>
                            </Card>
                            {   
                                parseInt(methods.getValues('id_category')) !== 2 ?
                                <Card sx={{ p: 3,mb: 3 }}>
                                    <Grid item xs={12} md={12} textAlign="right" sx={{mb:3}}>
                                        <Button variant="contained" color='primary' startIcon={<Iconify icon="eva:plus-fill" sx={undefined} />} onClick={handleAddServer}>
                                            Add Server
                                        </Button>
                                    </Grid>
                                    {
                                        methods.getValues('server').map((item,key) => {
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
                                                        <Grid container spacing={3} sx={{mb:3}}>
                                                            <Grid item xs={12} md={6}>
                                                                <RHFSelect name={`server[${key}].is_upload`} label="Property">
                                                                    <option value="true">
                                                                        Upload
                                                                    </option>
                                                                    <option value="false">
                                                                        Embed
                                                                    </option>
                                                                </RHFSelect>
                                                            </Grid>
                                                            { !item.is_upload || item.is_upload == "false" ? 
                                                                <MovieServer index={key}/>
                                                                :
                                                                <Grid item xs={12} md={12}>
                                                                    <LabelStyle>Video</LabelStyle>
                                                                    <RHFUploadSingleFile type="video" name={`server[${key}].source`} accept="video/*" maxSize={3145728} onDrop={handleDrop(`server[${key}].source`)} />
                                                                </Grid>
                                                            }
                                                        </Grid>
                                                    </AccordionDetails>
                                                    <AccordionActions>
                                                        <Button color='error' onClick={() => handleDelServer(key)}>Delete</Button>
                                                    </AccordionActions>
                                                </Accordion>
                                            )
                                        })
                                    }
                                </Card> : 
                                <Card sx={{ p: 3,textAlign:"right" }}> 
                                    <Button variant="contained" color='primary' onClick={handleOpenModalEp}>
                                        Handle Episode
                                    </Button>
                                    <Modal
                                        keepMounted 
                                        open={openEp}
                                        onClose={handleCloseModalEp}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        { isLoading ? 
                                            <Backdrop
                                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                open={openEp}
                                                onClick={handleCloseModalEp}
                                            >
                                                <CircularProgress color="inherit" />
                                            </Backdrop> :
                                            <MovieEpisode episodes={methods.getValues('episodes')} setValue={setValue} handleDrop={handleDrop}/>
                                        }
                                    </Modal>
                                </Card>
                            }
                            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                                    Submit
                                </LoadingButton>
                            </Stack>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>

                        </Grid>
                    </Grid>
                </FormProvider>
            </Container>
        </>
    );
}
