import { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Layout from "./Layout";
import Gallery from "../../components/Gallery";
import CreditsThumb from "../../components/CreditsThumb";
import { Rating, Grid, Typography, Container } from "@mui/material";
import { gradientBorder } from "../../theme/theme";
import { ParsedUrlQuery } from "querystring";
import {
  Movie,
  MovieCredits,
  MovieVideo,
  MovieBackdrops,
} from "../../types/types";
import {
  getMovieDetail,
  getMovieImages,
  getMovieVideos,
  getMovieCredits,
} from "../../services/tmdbAPI";

type Props = {
  movie: Movie;
  videos: MovieVideo[];
  images: MovieBackdrops[];
  credits: MovieCredits[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const Movie: FunctionComponent<Props> = ({
  movie,
  videos,
  images,
  credits,
}) => {
  return (
    <Layout title={movie.title}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          background: `radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(0,0,0,1) 90%)`,
        }}
      >
        <Image
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/NoneBackdrop.webp"
          }
          width={1920}
          height={1080}
          alt={`${movie.title}`}
          priority
          style={{
            width: "auto",
            zIndex: "-1001",
          }}
        />
        <Grid
          sx={{
            position: "absolute",
            paddingTop: "15em",
            margin: "0 auto",
            width: "80%",
            "> *": {
              padding: "1em 0",
            },
          }}
        >
          <Typography sx={{ maxWidth: "900px" }} variant="h1">
            {movie.title}
          </Typography>
          <Grid sx={{ display: "flex" }}>
            {movie.genres.map((genre) => (
              <Typography
                key={genre.id}
                sx={gradientBorder.styles}
                variant="body2"
              >
                {genre.name}&nbsp;
              </Typography>
            ))}
          </Grid>
          <Typography variant="body1">
            Release Date: {movie.release_date}
          </Typography>
          <Rating name="read-only" value={movie.vote_average / 2} readOnly />
          <Typography variant="body1" sx={{ maxWidth: "650px" }}>
            {movie.overview}
          </Typography>
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : "/NonePoster.webp"
            }
            height={500}
            width={333}
            alt={`${movie.title}`}
            priority
            style={{
              position: "absolute",
              width: "auto",
              top: "30%",
              right: "0",
              margin: "0",
              padding: "0",
              borderRadius: "15px",
            }}
          />
        </Grid>
      </Grid>
      <Container maxWidth={"xl"}>
        <CreditsThumb credits={credits} />
        <Gallery videos={videos} images={images} />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const params = context.params!;
  const movie = await getMovieDetail(params.id);
  const videos = await getMovieVideos(params.id);
  const images = await getMovieImages(params.id);
  const credits = await getMovieCredits(params.id);

  return {
    props: {
      movie: movie,
      videos: videos,
      images: images,
      credits: credits,
    },
  };
};

export default Movie;
