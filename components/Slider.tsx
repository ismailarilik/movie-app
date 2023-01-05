import Image from "next/image";
import Link from "next/link";
import ErrorPage from "next/error";
import { FunctionComponent } from "react";
import { Typography, Grid, Button } from "@mui/material";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "../types/types";
import { gradientBorder } from "../theme/theme";

import "swiper/css";

type Props = {
  movies: Movie[] | number;
};

const Slider: FunctionComponent<Props> = ({ movies }) => {
  if (typeof movies === "number") {
    return <ErrorPage statusCode={movies} />;
  }
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      preloadImages={true}
      watchSlidesProgress={true}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          {({ isVisible }) => (
            <Grid>
              {isVisible && (
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                    background: `radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(0,0,0,1) 80%)`,
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
                      left: "0",
                      right: "20%",
                      top: "30%",
                      margin: "0 auto",
                      maxWidth: "800px",
                      "> *": {
                        padding: "1em 0",
                      },
                    }}
                  >
                    <Typography variant="h2" component="h2">
                      {movie.title}
                    </Typography>
                    <Typography variant="body1">
                      {movie.overview?.slice(0, 70)}...
                    </Typography>
                    <Link href="/movie/[id]" as={`/movie/${movie.id}`}>
                      <Button sx={gradientBorder.styles}>Movie Detail</Button>
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
