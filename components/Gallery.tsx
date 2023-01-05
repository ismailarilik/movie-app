import Image from "next/image";
import { FunctionComponent } from "react";
import { Grid, Typography } from "@mui/material";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieVideo, MovieBackdrops } from "../types/types";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type Props = {
  videos: MovieVideo[];
  images: MovieBackdrops[];
};

const Gallery: FunctionComponent<Props> = ({ videos, images }) => {
  return (
    <Grid>
      <Typography m={"1em 0"} variant="h3">
        Gallery
      </Typography>
      <Swiper
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        watchSlidesProgress={true}
        preloadImages={true}
        className="mySwiper2"
      >
        {videos.map((video, index) => (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {({ isVisible }) => (
              <Grid>
                {isVisible && (
                  <iframe
                    key={video.id}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    width="1280px"
                    height="720px"
                    frameBorder="0px"
                  ></iframe>
                )}
              </Grid>
            )}
          </SwiperSlide>
        ))}
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {({ isVisible }) => (
              <Grid>
                {isVisible && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
                    width={1280}
                    height={720}
                    alt={`${image.file_path}`}
                    priority
                  ></Image>
                )}
              </Grid>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default Gallery;
