import { insert as insertMovieType } from '@/src/server/handler/movieType/insert';
import { insert as insertMovieCountries } from '@/src/server/handler/movieCountries/insert';
import { insert as insertMovies } from '@/src/server/handler/movies/insert';
import { insert as insertMovieServer } from '@/src/server/handler/movieServer/insert';
import { insert as insertMovieEpisode } from '@/src/server/handler/movieEpisode/insert';
import { getDetail as getDetailMovie } from '@/src/server/handler/movies/getDetail';
import { NextResponse } from 'next/server'
import fetch from "node-fetch";
import { insert as insertCast } from '@/src/server/handler/cast/insert';
import { insert as insertDirector } from '@/src/server/handler/director/insert';
import { insert as insertMovieDirector } from '@/src/server/handler/movieDirector/insert';
import { insert as insertFigure } from '@/src/server/handler/figure/insert';
import { processAddMovie } from '@/src/server/handler/movies/processAdd';
import { processEditMovie } from '@/src/server/handler/movies/processEdit';

export async function GET(request) {
    const origin_url = process.env.KPHIM_URL;
    const secret = request.nextUrl.searchParams.get('secret')
    const page = request.nextUrl.searchParams.get('page')
    const typeofList = request.nextUrl.searchParams.get('type')
    if (secret !== process.env.MY_SECRET_TOKEN) {
        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: 'Invalid Token',
        })
    }else{
        let api_list = origin_url;
        let api_detail = origin_url+"/phim";
        let version = 2;
        if(typeofList && ['phim-le','phim-bo','hoat-hinh','tv-shows'].includes(typeofList)){
            api_list = api_list+"/v1/api/danh-sach/"+typeofList;
            version = 1;
        }else{
            api_list = api_list+"/danh-sach/phim-moi-cap-nhat";
        }
        if(page && !isNaN(page)){
            api_list = api_list+"?page="+page;
        }else{
            api_list = api_list+"?page=1"
        }
        //gọi api lấy danh sách -> duyệt lấy slug -> gọi api lấy chi tiết -> push vào array với mẫu model -> insert
        const response = await fetch(api_list);
        const data = await response.json();
        if(data.status){
            let items;
            if(version === 1){
                items = data.data.items;
            }else{
                items = data.items;
            }
            let [movie_new, moviveEpisode, dataEpisode, movieCountry, movieType,movieDirectors,casts,directors,figure] = Array(9).fill([]);
            for (const element of items) {
                let {slug,thumb_url,poster_url} = element;
                thumb_url = thumb_url.split('/');
                poster_url = poster_url.split('/');
                thumb_url = thumb_url[thumb_url.length - 1];
                poster_url = poster_url[poster_url.length - 1];
                // check movie exist
                const response_detail = await fetch(`${api_detail}/${slug}`);
                const data_detail = await response_detail.json();
                const {movie,status,episodes} = data_detail;
                if(status){
                    const movieDetail = await getDetailMovie(slug,{episodes:true});
                    if(movieDetail !== null){
                        const data = await processEditMovie(movieDetail,movie,episodes);
                        moviveEpisode = [...data.moviveEpisode,...moviveEpisode]
                        dataEpisode = [...data.dataEpisode,...dataEpisode]
                    }else{
                        const data = await processAddMovie(movie,episodes,thumb_url,poster_url,origin_url);
                        movie_new = [...data.movie_new,...movie_new]
                        dataEpisode = [...data.dataEpisode,...dataEpisode]
                        moviveEpisode = [...data.moviveEpisode,...moviveEpisode]
                        movieType = [...data.movieType,...movieType]
                        movieCountry = [...data.movieCountry,...movieCountry]
                        movieDirectors = [...data.movieDirectors,...movieDirectors]
                        casts = [...data.casts,...casts]
                        directors = [...data.directors,...directors]
                        figure = [...data.figure,...figure]
                    }
                }
            };
            if(movie_new.length > 0){
                await insertMovies(movie_new);
            }
            if(dataEpisode.length > 0){
                await insertMovieEpisode(dataEpisode);
            }
            if(moviveEpisode.length > 0){
                await insertMovieServer(moviveEpisode);
            }
            if(movieType.length > 0){
                await insertMovieType(movieType);
            }
            if(movieCountry.length > 0){
                await insertMovieCountries(movieCountry);
            }
            if(casts.length > 0){
                await insertCast(casts);
            }
            if(directors.length > 0){
                await insertDirector(directors);
            }
            if(movieDirectors.length > 0){
                await insertMovieDirector(movieDirectors);
            }
            if(figure.length > 0){
                await insertFigure(figure);
            }
        }
        return NextResponse.json({data})
    }
}