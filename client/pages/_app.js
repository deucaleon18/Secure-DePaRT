import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { Provider } from "../context/context";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <>
        <Provider>
          <div className="">
            <Navbar />
            <div className="overflow-x-hidden">
              <Component {...pageProps} />
              <Footer/>
            </div>
            
          </div>
        </Provider>
    </>
  );
}

export default MyApp;
