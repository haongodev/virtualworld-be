import db from "@/src/library/prismadb";

export const destroyByMovieId = async (id_movie,prisma) => {
    return await (prisma ?? db).movieEpisode.deleteMany(
        { 
            where: { 
                id_movie
            }
        }
    )
};