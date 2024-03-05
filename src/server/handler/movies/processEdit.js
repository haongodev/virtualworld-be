import { update as updateMovies } from '@/src/server/handler/movies/update';
import { destroyByMovieId as destroyEpisodeByMovieId } from '@/src/server/handler/movieEpisode/destroyByMovieId';
import { destroyByMovieId as destroyMovieServerByMovieId } from '@/src/server/handler/movieServer/destroyByMovieId';
import { v4 as uuidv4 } from 'uuid';

export async function processEditMovie(movieDetail,movie,episodes) {
    // check had new episode then update dataEpisode and MovieEpisode
    const dataEpisode = [];
    const moviveEpisode = []
    if((movie.type === 'series' || movie.type === 'hoathinh' || episodes[0].server_data.length > 1)){
        if(episodes[0].server_data.length > movieDetail.episodes.length){
            if(movie.episode_current.match(/\d+/) !== null){
                await destroyMovieServerByMovieId(movieDetail.id);
                await destroyEpisodeByMovieId(movieDetail.id);
                let arrEpId = [];
                let ep = 0;
                for (const fist_sv of episodes[0].server_data) {
                    if(fist_sv.name !== ''){
                        const idEp = uuidv4();
                        dataEpisode.push({
                            "id":idEp,
                            "id_movie":movieDetail.id,
                            "name": "Tập "+ (fist_sv.name === "Full" ? (ep + 1) : (fist_sv.name === '' ? fist_sv.slug.match(/\d+/)[0] : fist_sv.name.match(/\d+/)[0])),
                            "slug": 'tap-'+(fist_sv.slug === '' ? (fist_sv.name === "Full" ? (ep + 1) : fist_sv.name.match(/\d+/)[0]) : fist_sv.slug.match(/\d+/)[0])
                        });
                        arrEpId.push(idEp);
                        ep++;
                    }
                }
                for (const episode of episodes) {
                    let index = 0;
                    for (const server_stream of episode.server_data) {
                        const dataStream = {
                            "id":uuidv4(),
                            "id_movie":movieDetail.id,
                            "name":episode.server_name,
                            "stream":server_stream.link_embed,
                            "source":server_stream.link_m3u8,
                            "id_episode":arrEpId[index],
                        };
                        index++;
                        moviveEpisode.push(dataStream);
                    }
                }
            }
        }
        const dataMovieUpdate = {
            "total_episode":movie.episode_total.match(/\d+/) ? parseInt(movie.episode_total.match(/\d+/)[0]) : 0,
            "current_episode":movie.episode_current.match(/\d+/) ? parseInt(movie.episode_current.match(/\d+/)[0]) : 0,
        }
        if(movieDetail.status !== 'completed' && movie.status === 'completed'){
            // update movie
            dataMovieUpdate["quality"] = movie.quality;
            dataMovieUpdate["status"] = movie.status;
            dataMovieUpdate["time"] = movie.time.includes('undefined') ? movie.time.replace(/\bundefined\b/g, '?') : movie.time;
        }
        await updateMovies(movieDetail.id,dataMovieUpdate);
    }else{
        await destroyMovieServerByMovieId(movieDetail.id);
        for (const episode of episodes) {
            for (const server_stream of episode.server_data) {
                const dataStream = {
                    "id":uuidv4(),
                    "id_movie":movieDetail.id,
                    "name":episode.server_name,
                    "stream":server_stream.link_embed,
                    "source":server_stream.link_m3u8
                };
                moviveEpisode.push(dataStream);
            }
        }
        if(movieDetail.status !== 'completed' && movie.status === 'completed'){
            // update movie
            const dataMovieUpdate = {
                "quality" : movie.quality,
                "status" : movie.status,
                "time" : movie.time.includes('undefined') ? movie.time.replace(/\bundefined\b/g, '?') : movie.time
            }
            await updateMovies(movieDetail.id,dataMovieUpdate);
        }
    }

    return {
        moviveEpisode,
        dataEpisode,
    }
}