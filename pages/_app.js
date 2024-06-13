import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from './components/LandingHeader';
import Footer from './components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      <Analytics />
    </>
  );
}
