import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "fictoan-react";
import { Theme } from "./../styles/Theme";
import { Header } from "../components/Header/Header";
import "@fontsource/sen/400.css";
import "@fontsource/sen/700.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
