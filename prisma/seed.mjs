import { PrismaClient } from "@prisma/client";
import { initType } from "./seedData/type.mjs";
import { initCountries } from "./seedData/countries.mjs"
import { initAdmin } from "./seedData/admin.mjs";
import { initMovies } from "./seedData/movies.mjs";
import { initMovieEpisode } from "./seedData/episode.mjs";
import { initMovieServer } from "./seedData/movieServer.mjs";
import { initMovieType } from "./seedData/movieType.mjs";
import { initCategories } from "./seedData/categories.mjs";
import { initPosition } from "./seedData/position.mjs";
import { initCast } from "./seedData/cast.mjs";
import { initCastMovie } from "./seedData/castMovie.mjs";
import { initMovieCountries } from "./seedData/movieCountry.mjs";
import { initReportType } from "./seedData/reportType.mjs";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$transaction([
    // prisma.type.createMany({
    //   data: initType,
    //   skipDuplicates: true,
    // }),
    // prisma.countries.createMany({
    //   data: initCountries,
    //   skipDuplicates: true,
    // }),
    prisma.admin.createMany({
      data: initAdmin,
      skipDuplicates: true,
    }),
    prisma.categories.createMany({
      data: initCategories,
      skipDuplicates: true,
    }),
    // prisma.movies.createMany({
    //   data: initMovies,
    //   skipDuplicates: true,
    // }),
    // prisma.movieType.createMany({
    //   data: initMovieType,
    //   skipDuplicates: true,
    // }),
    // prisma.movieEpisode.createMany({
    //   data: initMovieEpisode,
    //   skipDuplicates: true,
    // }),
    // prisma.movieServer.createMany({
    //   data: initMovieServer,
    //   skipDuplicates: true,
    // }),
    // prisma.position.createMany({
    //   data: initPosition,
    //   skipDuplicates: true,
    // }),
    // prisma.cast.createMany({
    //   data: initCast,
    //   skipDuplicates: true,
    // }),
    // prisma.movieCast.createMany({
    //   data: initCastMovie,
    //   skipDuplicates: true,
    // }),
    // prisma.movieCountries.createMany({
    //   data: initMovieCountries,
    //   skipDuplicates: true,
    // }),
    prisma.reportType.createMany({
      data: initReportType,
      skipDuplicates: true,
    }),
  ]);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
