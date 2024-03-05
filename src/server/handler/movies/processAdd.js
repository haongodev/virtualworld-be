import { v4 as uuidv4 } from 'uuid';
import { getDetail as getDetailType } from '@/src/server/handler/type/getDetail';
import { getDetail as getDetailCountry } from '@/src/server/handler/countries/getDetail';
import { store as storeType } from '@/src/server/handler/type/store';
import { store as storeCountry } from '@/src/server/handler/countries/store';
import sharp from 'sharp';
import { vietnameseToSlug } from '@/src/library/helper';
import { getDetail as getCastDetail} from '../cast/getDetail';
import { getDetail as getDirectorDetail} from '../director/getDetail';

const fs = require('fs');
const path = require('path');
const outputPathImage = "./public/assets/images/movies";

export async function processAddMovie(movie,episodes,thumb_url,poster_url,source_url) {
    const image_arr = [];
    const movie_new = [];
    const moviveEpisode = [];
    const dataEpisode = [];
    const movieCountry = [];
    const movieType = [];
    const movieDirectors = [];
    const casts = [];
    const directors = [];
    const figure = [];
    const movieId = uuidv4();
    // handle image poster
    const dataPoster = [
        {
            name:thumb_url !== '' ? thumb_url : 'default_thumb.png',
            url:movie.thumb_url,
            size:"180x300"
        },
        {
            name:poster_url !== '' ? poster_url : 'default_poster.png',
            url:movie.poster_url,
            size:"370x220"
        }
    ];
    for (const poster of dataPoster) {
        const outputPath = `${outputPathImage}/${poster.name}`;
        const directory = path.dirname(outputPath);
        const resizedOutputPath = `${outputPathImage}/${poster.size}/${poster.name}`;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        if (!fs.existsSync(outputPath)) {
            try {
                const response_image = await fetch(poster.url);
                if(response_image){
                    const arrayBuffer = await response_image.arrayBuffer();
                    fs.writeFileSync(outputPath,  Buffer.from(arrayBuffer));
                    const image = sharp(outputPath);

                    const directory_rez = path.dirname(resizedOutputPath);
                    if (!fs.existsSync(directory_rez)) {
                        fs.mkdirSync(directory_rez, { recursive: true });
                    }
                    const [width, height] = poster.size.split("x").map(Number);
                    await image.resize({ width, height }).toFile(resizedOutputPath);   
                }
            } catch (error) {
                
            }
        }
        image_arr.push(resizedOutputPath.replace(/^\.\/public/, ''));
    }
    const {category,country} = movie;
    // check type
    for (const item of category) {
        const type = await getDetailType(item.slug);
        let typeId;
        if(type == null){
            typeId = uuidv4();
            const dataStore = {
                id:typeId,
                name: item.name,
                slug: item.slug,
                description: `Xem Phim ${item.name} mới cập nhật, tuyển tập phim mới hơn 100000+ có phụ đề vietsub thuyết minh chất lượng fullHD tại phimhottt.com`,
            }
            await storeType(dataStore);
        }else{
            typeId = type.id;
        }
        movieType.push({
            "id_movie":movieId,
            "id_type":typeId
        })
    };
    if(movie.type === 'hoathinh'){
        const typeHoatHinh = await getDetailType('hoat-hinh');
        let typeHoatHinhId;
        if(typeHoatHinh == null){
            typeHoatHinhId = uuidv4();
            const dataStore = {
                id:typeHoatHinhId,
                name: "Hoạt Hình",
                slug: 'hoat-hinh',
                description: `Xem Phim Hoạt Hình mới cập nhật, tuyển tập phim mới hơn 100000+ có phụ đề vietsub thuyết minh chất lượng fullHD tại phimhottt.com`,
            }
            await storeType(dataStore);
        }else{
            typeHoatHinhId = typeHoatHinh.id;
        }
        movieType.push({
            "id_movie":movieId,
            "id_type":typeHoatHinhId
        })
    }
    // check country
    for (const item of country) {
        const country = await getDetailCountry(item.slug);
        let countryId;
        if(country == null){
            countryId = uuidv4();
            const dataStore = {
                id:countryId,
                name: item.name,
                slug: item.slug,
                description: `Xem Phim ${item.name} mới cập nhật, tuyển tập phim mới hơn 100000+ có phụ đề vietsub thuyết minh chất lượng fullHD tại phimhottt.com`,
            }
            await storeCountry(dataStore);
        }else{
            countryId = country.id;
        }
        movieCountry.push({
            "id_movie":movieId,
            "id_country":countryId
        })
    }
    const dataMovie = {
        "id":movieId,
        "name":movie.name,
        "slug":movie.slug,
        "origin_name":movie.origin_name,
        "publish_date":new Date(movie.year+'-01-01'),
        "quality":movie.quality,
        "language":movie.lang,
        "thumb_image":image_arr[0],
        "image":image_arr[1],
        "summary":movie.content,
        "trailer_url":movie.trailer_url,
        "view":movie.view,
        "id_category":parseInt(movie.episode_total) === 1 && movie.episode_current === 'Full' ? 1 : 2,
        "total_episode":movie.episode_total.match(/\d+/) ? parseInt(movie.episode_total.match(/\d+/)[0]) : 0,
        "time": movie.time.includes('undefined') ? movie.time.replace(/\bundefined\b/g, '?') : movie.time ,
        "status": movie.status,
        "is_copyright": movie.is_copyright,
        "sub_docquyen": movie.sub_docquyen,
        "current_episode":movie.episode_current.match(/\d+/) ? parseInt(movie.episode_current.match(/\d+/)[0]) : 0,
        "is_cinema":movie.chieurap,
        "description":movie.content.replace(/<\/?[^>]+(>|$)/g, '').slice(0,300),
        "source_from":source_url ? source_url : null
    }
    movie_new.push(dataMovie);
    let arrEpId = [];
    if(movie.episode_current.match(/\d+/) !== null){
        if((movie.type === 'series' || movie.type === 'hoathinh' || episodes[0].server_data.length > 1)){
            for (const fist_sv of episodes[0].server_data) {
                if(fist_sv.name !== ''){
                    const idEp = uuidv4();
                    dataEpisode.push({
                        "id":idEp,
                        "id_movie":movieId,
                        "name": "Tập "+ (fist_sv.name === "Full" ? movie.episode_total.match(/\d+/)[0] : (fist_sv.name === '' ? fist_sv.slug.match(/\d+/)[0] : (fist_sv.name.match(/\d+/) ? fist_sv.name.match(/\d+/)[0] : fist_sv.name))),
                        "slug": 'tap-'+(fist_sv.slug === '' ? (fist_sv.name === "Full" ? movie.episode_total.match(/\d+/)[0] : fist_sv.name.match(/\d+/)[0]) : (fist_sv.slug.match(/\d+/) ? fist_sv.slug.match(/\d+/)[0] : fist_sv.slug))
                    });
                    arrEpId.push(idEp);
                }
            }
        }
    }
    for (const episode of episodes) {
        let index = 0;
        for (const server_stream of episode.server_data) {
            const dataStream = {
                "id":uuidv4(),
                "id_movie":movieId,
                "name":episode.server_name,
                "stream":server_stream.link_embed,
                "source":server_stream.link_m3u8
            };
            if((movie.type === 'series' || movie.type === 'hoathinh' || episodes[0].server_data.length > 1)){
                dataStream['id_episode'] = arrEpId[index];
                index++;
            }
            moviveEpisode.push(dataStream);
        }
    }
    for (const actor of movie.actor) {
        if(actor !== ''){
            const slugCast = vietnameseToSlug(actor);
            const checkCast = await getCastDetail(slugCast);
            let idCast = uuidv4();
            if(checkCast){
                idCast = checkCast.id;
            }else{
                const dataActor = {
                    "id":idCast,
                    "name":actor,
                    "slug":slugCast
                };
                casts.push(dataActor);
            }
            const DataFigure = {
                "id":uuidv4(),
                "id_movie":movieId,
                "id_cast":idCast,
            }
            figure.push(DataFigure);
        }
    }
    for (const director of movie.director) {
        if(director !== ''){
            const slugDirector = vietnameseToSlug(director);
            const checkDrec = await getDirectorDetail(slugDirector);
            let idDirector = uuidv4();
            if(checkDrec){
                idDirector = checkDrec.id;
            }else{
                const dataDirector = {
                    "id":idDirector,
                    "name":director,
                    "slug":slugDirector,
                };
                directors.push(dataDirector);
            }
            const dataMovieDirector = {
                "id":uuidv4(),
                "id_movie":movieId,
                "id_director":idDirector,
            };
            movieDirectors.push(dataMovieDirector);
        }
    }
    return {
        movie_new,
        moviveEpisode,
        dataEpisode,
        movieCountry,
        movieType,
        directors,
        movieDirectors,
        figure,
        casts
    }
}