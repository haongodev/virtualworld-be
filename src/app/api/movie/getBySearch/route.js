import { vietnameseToSlug } from '@/src/library/helper';
import { getFromOphim } from '@/src/server/api/movies/getFromOphim';
import { processAddMovie } from '@/src/server/handler/movies/processAdd';
import { getBySearch } from '@/src/server/handler/movies/getBySearch';
import { NextResponse } from 'next/server';
import { insert as insertMovieType } from '@/src/server/handler/movieType/insert';
import { insert as insertMovieCountries } from '@/src/server/handler/movieCountries/insert';
import { insert as insertMovies } from '@/src/server/handler/movies/insert';
import { insert as insertMovieServer } from '@/src/server/handler/movieServer/insert';
import { insert as insertMovieEpisode } from '@/src/server/handler/movieEpisode/insert';
import { insert as insertCast } from '@/src/server/handler/cast/insert';
import { insert as insertDirector } from '@/src/server/handler/director/insert';
import { insert as insertMovieDirector } from '@/src/server/handler/movieDirector/insert';
import { insert as insertFigure } from '@/src/server/handler/figure/insert';

const path = require('path');

export async function POST(request) {
    const body = await request.json();
    let data = await getBySearch(body);
    if(data.total === 0){
        const {s} = body;
        const slug = vietnameseToSlug(s);
        const resonse = await getFromOphim(slug);
        if(resonse.status){
            const {movie,episodes} = resonse;
            const { movie_new, dataEpisode,moviveEpisode,movieType,movieCountry,movieDirectors,casts,directors,figure } = await processAddMovie(movie,episodes,path.basename(movie.thumb_url),path.basename(movie.poster_url));
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
            data = {
                data:movie_new,
                total:1
            };
        }
    }
    return NextResponse.json({data,success:true});
}