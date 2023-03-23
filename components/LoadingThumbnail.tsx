import { FunctionComponent } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Skeleton } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const LoadingThumbnail: FunctionComponent = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={30}
      slidesPerGroup={4}
      loop={true}
      tag={"section"}
      watchSlidesProgress={true}
      loopFillGroupWithBlank={true}
      pagination={{
        clickable: true,
      }}
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
      style={{ padding: "4em" }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      <Grid>
        {Array.from(new Array(12)).map((item, index = 0) => (
          <SwiperSlide key={index++}>
            <Grid>
              <Skeleton
                variant="rectangular"
                height={450}
                width={300}
                animation="wave"
              />

              <Skeleton variant="text" animation="wave" width={250} />
            </Grid>
          </SwiperSlide>
        ))}
      </Grid>
    </Swiper>
  );
};

export default LoadingThumbnail;
