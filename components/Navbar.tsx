import { FunctionComponent, cloneElement, ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  FormControl,
  InputAdornment,
  InputBase,
  useScrollTrigger,
  CssBaseline,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  window?: () => Window;
  children: ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 0 : 0,
    color: trigger ? "primary" : "transparent",
  });
}

const Navbar: FunctionComponent = (props) => {
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          color="transparent"
          sx={{ transition: "all 0.5s ease" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Link href="/">
              <Image src="/logo.svg" alt="logo" height={100} width={100} />
            </Link>
            <FormControl>
              <InputBase
                id="standard-search"
                type={"text"}
                sx={{ p: "2em", fontSize: "2rem" }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ mr: "20px", fontSize: "2rem" }}
                    ></SearchIcon>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Navbar;
