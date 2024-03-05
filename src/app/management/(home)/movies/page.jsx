import MovieList from '@/src/backend/components/Sections/Board/Movie/List';
import { DefaultLanguage, moviePerPage } from '@/src/backend/constant';
import getAdminMessages from '@/src/intl/getAdminMessages';
import { getBySearch } from '@/src/server/handler/movies/getBySearch';
import { createTranslator } from 'next-intl';
import { cookies } from 'next/headers';
import React from 'react'

export async function generateMetadata({params}) {
  const locale = cookies().get('MANAGEMENT_LOCALE')?.value ?? DefaultLanguage;
  const messages = await getAdminMessages(locale);
  const t = createTranslator({locale, messages});
  return {
      title: t('Meta.title.MovieList')
  };
}

export default async function MovieListPage() {
  const {list_take} = moviePerPage; 
  const include = {
    type:{
      include:{
        type:true
      }
    }
  };
  const orderBy = {
    updatedAt: 'desc'
  };
  const params = {
    take: list_take,
    withTotal: true,
    orderBy,
    include
  }
  const movies = await getBySearch(params);
  return (
    <MovieList movies={movies.data} total={movies.total} take={list_take} include={include} orderBy={orderBy}/>
  )
}
