import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";
import Layout from "./Layout";
import Thumbnail from "../components/Thumbnail";
import Slider from "../components/Slider";
import { Container, Grid, Typography } from "@mui/material";
import { Movie } from "../types/types";
import {
  getDiscoverMovies,
  getTrendingMovies,
  getUpcomingMovies,
  getPopularMovies,
} from "../services/tmdbAPI";

type Props = {
  moviesTrending: Movie[] | number;
  moviesPopular: Movie[] | number;
  moviesDiscover: Movie[] | number;
  moviesUpcoming: Movie[] | number;
};

const Home: FunctionComponent<Props> = ({
  moviesTrending,
  moviesPopular,
  moviesDiscover,
  moviesUpcoming,
}) => {
  return (
    <Layout>
      <Grid component={"main"}>
        <Slider movies={moviesDiscover} />
        <Container maxWidth="xl" component={"div"}>
          <Typography variant="h3" id="trending">
            Trending This Week
          </Typography>
          <Thumbnail movies={moviesTrending} />
          <Typography variant="h3" id="popular">
            Popular
          </Typography>
          <Thumbnail movies={moviesPopular} />
          <Typography variant="h3" id="discover">
            Discover
          </Typography>
          <Thumbnail movies={moviesDiscover} />
          <Typography variant="h3" id="upcoming">
            Upcoming
          </Typography>
          <Thumbnail movies={moviesUpcoming} />
        </Container>
      </Grid>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const moviesTrending = await getTrendingMovies("2");
  const moviesPopular = await getPopularMovies("2");
  const moviesDiscover = await getDiscoverMovies("1");
  const moviesUpcoming = await getUpcomingMovies("1");

  return {
    props: {
      moviesTrending,
      moviesPopular,
      moviesDiscover,
      moviesUpcoming,
    },
  };
};
