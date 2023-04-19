// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getMoviesBySearch } from '../../services/tmdbAPI';
import { Movie } from '../../types/types';

type SearchData = {
  results: Array<Movie[]>;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchData | ErrorResponse>
) {
  const { q } = req.query;
  try {
    const searchData = await getMoviesBySearch(q as string);    
    res.status(200).json(searchData);
  } catch (error) {      
    res.status(500).json({ error: ' Something went wrong' });
  }
}
