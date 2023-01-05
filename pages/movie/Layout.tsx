import Head from "next/head";
import { FunctionComponent, ReactElement } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

type LayoutProps = {
  children: ReactElement | object;
  title: string;
};

const Layout: FunctionComponent<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>TMDB | {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
