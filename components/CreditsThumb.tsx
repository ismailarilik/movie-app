import Image from "next/image";
import { FunctionComponent } from "react";
import { Typography, Grid } from "@mui/material";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCredits } from "../types/types";

type Props = {
  credits: MovieCredits[];
};

const CreditsThumb: FunctionComponent<Props> = ({ credits }) => {
  return (
    <Grid>
      <Typography m={"1em 0"} variant="h3">
        Series Cast
      </Typography>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        slidesPerGroup={1}
        watchSlidesProgress={true}
        breakpoints={{
          50: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={{ padding: "4em" }}
        className="mySwiper"
      >
        {credits?.map((credit) => (
          <SwiperSlide key={credit.id}>
            {({ isVisible }) => (
              <Grid sx={{ maxWidth: "300px" }}>
                {isVisible && (
                  <Grid>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                      alt={`${credit.name}`}
                      height={450}
                      width={300}
                      priority
                    />
                    <Typography variant="h6" component="h3">
                      {credit.name}
                    </Typography>
                    <Typography variant="body1" component="h3">
                      ({credit.character})
                    </Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default CreditsThumb;
