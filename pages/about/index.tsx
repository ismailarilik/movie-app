import { Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Layout from "./Layout";

const About: FunctionComponent = () => {
  return (
    <Layout>
      <Grid sx={{ m: "16em" }}>
        <Typography variant="h2">About Page</Typography>
      </Grid>
    </Layout>
  );
};

export default About;
