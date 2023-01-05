import Link from "next/link";
import { FunctionComponent } from "react";
import { Divider, Grid, Typography } from "@mui/material";

const Footer: FunctionComponent = () => {
  return (
    <Grid
      sx={{
        background: `url(${"/footer-background.jpg"}) no-repeat center center / cover `,
        height: "auto",
        mt: "8em",
        p: "8em",
      }}
    >
      <Grid container sx={{ m: "0 auto", maxWidth: "550px" }}>
        <Grid item xs>
          <Link href="/">
            <Typography variant="h5">Home</Typography>
          </Link>
          <Link href="/about">
            <Typography variant="h5">About</Typography>
          </Link>
          <Typography variant="h5">Contact Us</Typography>
          <Typography variant="h5">Term of Services</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          <Link href="/#trending" scroll={false}>
            <Typography variant="h5">Trending</Typography>
          </Link>
          <Link href="/#popular" scroll={false}>
            <Typography variant="h5">Popular</Typography>
          </Link>
          <Link href="/#discover" scroll={false}>
            <Typography variant="h5">Discover</Typography>
          </Link>
          <Link href="/#upcoming" scroll={false}>
            <Typography variant="h5">Upcoming</Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
