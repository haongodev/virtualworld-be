import { getByMovieId } from '@/src/server/handler/movieEpisode/getByMovieId';
import { NextResponse } from 'next/server';

export async function GET(request,{params:{movieId}}) {
    const episodes = await getByMovieId(movieId,{server:true});
    if(episodes){
        return NextResponse.json({ data: episodes, success: true });
    }
    return NextResponse.json({data:{},success:false});
}