import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { Provider } from "../context/context";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider
        appId={`${process.env.NEXT_PUBLIC_APP_ID}`}
        serverUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}`}
      >
        <Provider>
          <div className="">
            <Navbar />
            <div className="overflow-hidden">
              <Component {...pageProps} />
              <Footer/>
            </div>
            
          </div>
        </Provider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
