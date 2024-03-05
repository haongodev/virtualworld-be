import db from "@/src/library/prismadb";

export const getByMovieId = async (id_movie,include,prisma) => {
    return await (prisma ?? db).movieEpisode.findMany(
        { 
            include,
            where: { 
                id_movie
            }
        }
    )
};