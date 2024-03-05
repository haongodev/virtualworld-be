"use client"
import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Card,
    Table,
    Button,
    TableRow,
    Checkbox,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
// redux
// import { useDispatch, useSelector } from '../../../redux/store';
// import { getProducts } from '../../../redux/slices/product';
import SearchNotFound from '../../../SearchNotFound';
import HeaderBreadcrumbs from '../../../HeaderBreadcrumbs';
import CustomImage from '../../../Image';
// sections
import {
    MovieMoreMenu,
    MovieListHead,
    MovieListToolbar,
} from './Widget';
import React from 'react';
import useSettings from '@/src/backend/hooks/useSettings';
import { PATH_DASHBOARD } from '@/src/backend/routes';
import Iconify from '../../../Iconify';
import Scrollbar from '../../../Scrollbar';
import { fDate } from '@/src/backend/utils/formatTime';
import { useTranslations } from 'next-intl';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import { getBySearch } from '@/src/server/api/movies/getBySearch';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import { useMutation } from "@tanstack/react-query";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Movie'},
    { id: 'publish_date', label: 'Publish Date'},
    { id: 'id_category', label: 'Category'},
    { id: 'types', label: 'Type'},
    { id: 'status', label: 'Status'},
    { id: 'is_hot', label: 'Is Hot'},
    { id: 'time', label: 'Time'},
    { id: 'time', label: 'Total Episode'},
    { id: 'createdAt', label: 'Last Modified'},
    { id: '' },
];


export default function MovieList({movies,take,total,include,orderBy}) {
    const { themeStretch } = useSettings();
    const t = useTranslations('Contain.list.movie');
    const theme = useTheme();

    const [firstUpdate, setFirstUpdate] = useState(true);

    const [movieList, setMovieList] = useState(movies);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [page, setPage] = useState(0);

    const [filterName, setFilterName] = useState('');

    const [queryKey, setQueryKey] = useState({
            s:filterName,
            take:take,
            skip:0,
            include,
            orderBy
    });
    
    useEffect(() => {
        setFirstUpdate(false)
    },[])

    useEffect(() => {
        if(!firstUpdate){
            mutation.mutate(queryKey)
        }
    },[queryKey])

    const mutation = useMutation({
        mutationFn: (queryKey) => {
            return getBySearch(queryKey).then((res) => {
                if(res.success){
                    setMovieList(res.data);
                }
            })
        },
    })

    const handleChangePage = async (value) => {
        const cloneKeyQuery = {...queryKey};
        cloneKeyQuery.skip = queryKey.take * value;
        setPage(value);
        setQueryKey(cloneKeyQuery);
    }

    const handleChangeRowsPerPage = (event) => {
        const cloneKeyQuery = {...queryKey};
        cloneKeyQuery.take = parseInt(event.target.value, 10);
        cloneKeyQuery.skip = 0;
        setPage(0);
        setQueryKey(cloneKeyQuery);
    };

    const handleRequestSort = (property) => {
        const isAsc = Object.keys(queryKey.orderBy)[0] === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        // setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const selected = movieList.map((n) => n.name);
            setSelected(selected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
    };

    const handleDeleteProduct = (productId) => {
        const deleteProduct = movieList.filter((product) => product.id !== productId);
        setSelected([]);
        setMovieList(deleteProduct);
    };

    const handleDeleteProducts = (selected) => {
        const deleteProducts = movieList.filter((product) => !selected.includes(product.name));
        setSelected([]);
        setMovieList(deleteProducts);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * queryKey.take - (movieList.length * page)) : 0;

    const filteredProducts = applySortFilter(movieList, getComparator(order, Object.keys(queryKey.orderBy)[0]), filterName);

    const isNotFound = !filteredProducts.length && Boolean(filterName);

    return (
        <>
        <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
                heading="Movie List"
                links={[
                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    { name: 'Movie List' },
                ]}
                sx={undefined}
                action={
                    <NextLink href={PATH_DASHBOARD.movies+'/add'} passHref>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" sx={undefined} />}>
                            New Movie
                        </Button>
                    </NextLink>
                }
            />

            <Card>
                <MovieListToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                    onDeleteProducts={() => handleDeleteProducts(selected)}
                />
                {!mutation.isPending && (
                <Scrollbar sx={undefined}>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <MovieListHead
                                order={order}
                                orderBy={Object.keys(queryKey.orderBy)[0]}
                                headLabel={TABLE_HEAD}
                                rowCount={movieList.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredProducts.map((row) => {
                                    const { id, name, origin_name, slug, publish_date, updatedAt, thumb_image, id_category, type, status, is_hot, time, total_episode } = row;
                                    const isItemSelected = selected.indexOf(name) !== -1;
                                    return (
                                        <TableRow
                                            hover
                                            key={id}
                                            tabIndex={-1}
                                            role="checkbox"
                                            selected={isItemSelected}
                                            aria-checked={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                                            </TableCell>
                                            <TableCell style={{ maxWidth: 360 }} sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CustomImage
                                                    disabledEffect
                                                    alt={name}
                                                    src={thumb_image}
                                                    sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2, minWidth:100 }} ratio={undefined}/>
                                                <Typography variant="subtitle2" noWrap>
                                                    {name}<br/>
                                                    <small>{origin_name}</small>
                                                </Typography>
                                            </TableCell>
                                            <TableCell style={{ minWidth: 150 }}>{fDate(publish_date)}</TableCell>
                                            <TableCell>
                                                {
                                                    id_category === 1 ? t('types.single') : id_category === 2 ? t('types.series') : t('types.review')
                                                }
                                            </TableCell>
                                            <TableCell style={{ minWidth: 300 }}>
                                                { type?.map((item) => <Chip key={item.id} sx={{mr:1,mb:1}} label={item.type.name} variant="outlined" />)}
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={status} variant="filled" color={status === 'completed' ? 'primary' : ( status === 'ongoing' ? 'warning' : 'info'  )}/>
                                            </TableCell>
                                            <TableCell style={{ minWidth: 160 }}>
                                                <Switch checked={is_hot} />
                                            </TableCell>
                                            <TableCell style={{ minWidth: 160 }}>{time}</TableCell>
                                            <TableCell style={{ minWidth: 160 }}>{total_episode}</TableCell>
                                            <TableCell style={{ minWidth: 160 }}>{fDate(updatedAt)}</TableCell>
                                            <TableCell align="right">
                                                <MovieMoreMenu slug={slug} onDelete={() => handleDeleteProduct(id)} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > movieList.lenngth * page && (
                                    <TableRow style={{ height: 53 * (emptyRows / page) }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            {isNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6}>
                                            <Box sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Scrollbar>
                )}
                {mutation.isPending && (
                <Container maxWidth={themeStretch ? 'lg' : 'md'}>
                    <Grid sx={{ minHeight: '80vh',display:'flex' }} alignItems="center">
                        <LinearProgress sx={{ width:'100%' }}/>
                    </Grid>
                </Container>
                )}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={queryKey.take}
                    page={page}
                    onPageChange={(event, value) => handleChangePage(value)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
        </>
    );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    if (query) {
        return array.filter((_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    return stabilizedThis.map((el) => el[0]);
}
