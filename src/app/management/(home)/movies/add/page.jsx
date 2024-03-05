import MovieAddOrEditForm from '@/src/backend/components/Sections/Board/Movie/AddOrEdit'
import { getList as getListCountries } from '@/src/server/handler/countries/getList';
import { getList as getListType } from '@/src/server/handler/type/getList';
import { getList as getListCategory } from '@/src/server/handler/categories/getList';
import React from 'react'

export default async function MovieAdd() {
  const categories = await getListCategory();
  const types = await getListType();
  const countries = await getListCountries();
  return (
    <MovieAddOrEditForm movie={null} categories={categories} types={types} countries={countries}/>
  )
}
