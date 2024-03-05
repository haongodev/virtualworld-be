import { processEditMovie } from '@/src/server/handler/movies/processEdit';
import { NextResponse } from 'next/server';
import { insert as insertMovieServer } from '@/src/server/handler/movieServer/insert';
import { insert as insertMovieEpisode } from '@/src/server/handler/movieEpisode/insert';
import { getDetail as getDetailMovie } from '@/src/server/handler/movies/getDetail';
import { exec } from 'child_process';
import { revalidatePath } from 'next/cache'

export async function GET(request) {
    const nodeId = process.env.NODE_ID;
    const { searchParams } = new URL(request.url);
    const paramsObject = {};
    searchParams.forEach((value,key) => paramsObject[key] = value);

    if(paramsObject.source_from === "null"){
        paramsObject.source_from = process.env.OPHIM_URL;
    }
    let moviveEpisode = [];
    let dataEpisode = [];
    const response_detail = await fetch(`${paramsObject.source_from}/phim/${paramsObject.slug}`);
    const movieDetail = await getDetailMovie(paramsObject.slug,{episodes:true});
    const data_detail = await response_detail.json();
    const {movie,episodes,status} = data_detail;
    if(status){
        if(movieDetail !== null){
            const data = await processEditMovie(movieDetail,movie,episodes);
            moviveEpisode = [...data.moviveEpisode,...moviveEpisode];
            dataEpisode = [...data.dataEpisode,...dataEpisode];
            if(dataEpisode.length > 0){
                await insertMovieEpisode(dataEpisode);
            }
            if(moviveEpisode.length > 0){
                await insertMovieServer(moviveEpisode);
            }
            revalidatePath(`/`,'layout');
            exec('pm2 reload '+nodeId)
            return NextResponse.json({ data: {}, success: true });
        }
    }
    return NextResponse.json({data:{},success:false});
}