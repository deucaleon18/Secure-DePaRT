import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { Provider } from "../context/context";
function MyApp({ Component, pageProps }) {
  return (
    <>
    <MoralisProvider appId={`${process.env.NEXT_PUBLIC_APP_ID}`} serverUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}`}>
      <Provider>

      <Component {...pageProps} />
      </Provider>
    </MoralisProvider>
    </>
  );
}

export default MyApp;
