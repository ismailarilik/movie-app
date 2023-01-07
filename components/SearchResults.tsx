import { FunctionComponent } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { fetcher, search } from "../services/tmdbAPI";
import {
  Collapse,
  List,
  Skeleton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Movie } from "../types/types";

type Props = {
  show: boolean;
  query: string | undefined;
};

const SearchResults: FunctionComponent<Props> = ({ query, show }) => {
  const { data, error, isLoading } = useSWR(
    query ? search(query!) : null,
    fetcher
  );

  if (error) {
    return (
      <Collapse
        in={show}
        timeout="auto"
        unmountOnExit
        style={{ padding: "0 2em" }}
      >
        <Typography variant="body1" sx={searchResultsStyles.noneMoviesList}>
          {error.toString()}
        </Typography>
      </Collapse>
    );
  }
  if (isLoading)
    return (
      <Collapse
        in={show}
        timeout="auto"
        unmountOnExit
        style={{ padding: "0 2em" }}
      >
        <List sx={searchResultsStyles.moviesList}>
          {Array.from(new Array(20)).map((item, index) => (
            <ListItem sx={searchResultsStyles.listItem} key={index}>
              <Skeleton
                variant="rectangular"
                width={80}
                height={120}
                animation="wave"
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={250}
                sx={{ margin: "0 1em" }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    );
  if (!data || data?.results.length === 0)
    return (
      <Collapse
        in={show}
        timeout="auto"
        unmountOnExit
        style={{ padding: "0 2em" }}
      >
        <Typography variant="body1" sx={searchResultsStyles.noneMoviesList}>
          There are no movies that matched your query.
        </Typography>
      </Collapse>
    );
  return (
    <Collapse
      in={show}
      timeout="auto"
      unmountOnExit
      style={{ padding: "0 2em" }}
    >
      <List sx={searchResultsStyles.moviesList}>
        {data &&
          data?.results.map((movie: Movie) => (
            <ListItem sx={searchResultsStyles.listItem} key={movie.id}>
              <Link href="/movie/[id]" as={`/movie/${movie.id}`}>
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                      : "/NonePoster.webp"
                  }
                  width={92}
                  height={138}
                  alt={`${movie.title}`}
                />
                <ListItemText sx={{ margin: "0 1em" }}>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">{movie.release_date}</Typography>
                </ListItemText>
              </Link>
            </ListItem>
          ))}
      </List>
    </Collapse>
  );
};

const searchResultsStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "450px",
    height: "450px",
    backgroundColor: "#0D0D0D",
  },
  moviesList: {
    position: "fixed",
    height: "450px",
    width: "450px",
    backgroundColor: "#0D0D0D",
    borderRadius: "0px 0px 15px 15px",
    overflowY: "scroll",
  },
  listItem: {
    "> *": {
      display: "flex",
    },
    ":hover": {
      backgroundColor: "#1976D2",
      zIndex: "-1001",
      transition: "all 300ms ease",
    },
  },
  noneMoviesList: {
    position: "fixed",
    height: "450px",
    width: "450px",
    backgroundColor: "#0D0D0D",
    borderRadius: "0px 0px 15px 15px",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default SearchResults;
