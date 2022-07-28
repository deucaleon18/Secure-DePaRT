import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMoralis} from "react-moralis";
import Image from "next/image";

export default function Home() {
  const {logout}=useMoralis()
  return (
    <div>
      <Head>
        <title>Secure-DePART</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className={`${styles.container} h-screen relative m-auto`}>
        {/* <Image
          src={"/Images/Bg.png"}
          layout="fill"
          objectFit="cover"
          className="z-[-10] absolute "
        /> */}
        <img src="/Images/Bg.png" className="absolute top-0 w-full h-full object-cover -z-10" />
        <div className={`m-auto z-40 ${styles.headlines}`}>
          <div className="grid grid-cols-4 w-full place-items-center h-[600px]">
            <div className="flex flex-col col-span-2 gap-4">
              <div className="text-5xl leading-loose leading-[54px] tracking-wide font-700 text-white">
                Decentralized Packaging and Return Technology
              </div>
              <div className="text-xl font-100 text-gray-200 font-thin">
                Revolutionalizing the future of customer trust , through hassle
                free returns.
              </div>
              <button
                className="w-48 h-10 font-100 text-base rounded "
                onClick={logout}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
