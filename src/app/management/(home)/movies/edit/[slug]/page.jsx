import MovieAddOrEditForm from '@/src/backend/components/Sections/Board/Movie/AddOrEdit'
import { getList as getListCountries } from '@/src/server/handler/countries/getList';
import { getList as getListType } from '@/src/server/handler/type/getList';
import { getList as getListCategory } from '@/src/server/handler/categories/getList';
import { getDetail } from '@/src/server/handler/movies/getDetail';
import React from 'react'

export default async function MovieEdit({params:{slug}}) {
  const include = {
    server:true,
    type:true,
    movieCountries:true,
  }
  const movie = await getDetail(slug,include);
  const categories = await getListCategory();
  const types = await getListType();
  const countries = await getListCountries();
  return (
    <MovieAddOrEditForm movie={movie} categories={categories} types={types} countries={countries}/>
  )
}
