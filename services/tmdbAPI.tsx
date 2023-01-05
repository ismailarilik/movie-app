import axios from "axios";
import { MovieVideo } from "../types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const movie = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip,deflate,compress",
  },
  params: {
    api_key: API_KEY,
  },
});

export const getDiscoverMovies = async (page: string = "1") => {
  try {
    const response = await movie.get(`discover/movie`, {
      params: {
        page: page,
        sort_by: "popularity.desc",
      },
    });
    return response?.data.results;
  } catch (error: any) {
    const { response } = error;
    return response.status;
  }
};

export const getPopularMovies = async (page: string = "1") => {
  try {
    const response = await movie.get(`movie/popular`, {
      params: {
        page: page,
      },
    });
    return response?.data.results;
  } catch (error: any) {
    const { response } = error;
    return response.status;
  }
};

export const getUpcomingMovies = async (page: string = "1") => {
  try {
    const response = await movie.get(`movie/upcoming`, {
      params: {
        page: page,
      },
    });
    return response?.data.results;
  } catch (error: any) {
    const { response } = error;
    return response.status;
  }
};

export const getTrendingMovies = async (page: string = "1") => {
  try {
    const response = await movie.get(`trending/movie/week`, {
      params: {
        page: page,
      },
    });
    return response?.data.results;
  } catch (error: any) {
    const { response } = error;
    return response.status;
  }
};

export const getMovieDetail = async (movie_id: string) => {
  try {
    const response = await movie.get(`movie/${movie_id}`, {
      params: {
        movie_id: movie_id,
      },
    });
    return response?.data;
  } catch (error: any) {
    const { response } = error;
    return response.status;
  }
};

export const getMovieVideos = async (movie_id: string) => {
  try {
    const response = await movie.get(`movie/${movie_id}/videos`, {
      params: {
        movie_id: movie_id,
      },
    });
    return response?.data.results.filter(
      (video: MovieVideo) => video.type === "Trailer"
    );
  } catch (error: any) {
    const { response } = error;
    return response.status;
  }
};

export const getMovieImages = async (movie_id: string) => {
  try {
    const response = await movie.get(`movie/${movie_id}/images`, {
      params: {
        movie_id: movie_id,
      },
    });
    return response?.data.backdrops.slice(0, 10);
  } catch (error: any) {
    const { response } = error;
    return response.status;
  }
};

export const getMovieCredits = async (movie_id: string) => {
  try {
    const response = await movie.get(`movie/${movie_id}/credits`, {
      params: {
        movie_id: movie_id,
      },
    });
    return response?.data.cast.filter(
      (item: any) => item.profile_path !== null
    );
  } catch (error: any) {
    const { response } = error;
    return response.status;
  }
};
