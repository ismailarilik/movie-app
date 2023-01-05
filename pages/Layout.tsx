import Head from "next/head";
import { FunctionComponent, ReactElement } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type LayoutProps = {
  children: ReactElement | object;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>TMDB App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
