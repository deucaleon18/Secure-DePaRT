import Image from "next/image";
import React from 'react'
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import AUTH_CONTEXT from "../context/context";
import styles from "../styles/navbar.module.css";
import Webcam from "react-webcam";
import SideModal from "./SideModal";
import { initiateCustomerReturn, packageCheck } from "../services/productServices";
import { toast, ToastContainer } from "react-toastify";
import QRScanner from "./QRScan";
import { useEffect } from "react";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
export default function Navbar() {
  const { signIn, signOut, user } = useContext(AUTH_CONTEXT);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [scan, setScan] = useState(false);
  const [uid, setUID] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  const [qr,setQR]=useState(false)
  const [scanner, setScanner] = useState(false);
  const [mes,setMes]=useState()
  const hadnleReturns = async (payload) => {
    try {
      console.log("hellllll")
      let res = await packageCheck(
        {
          name: "product",
          image: payload,
        },
        "productPredict/"
      );
      if (res != "False") {
        setStatus()
        toast.success(
          "Product is in proper condition.Checking for avaliable returns!"
        );
        setScanner(true);
      }else{
         toast.error('Product is damaged.Cannot be returned!')
         setShow(false)
      }
    } catch (error) {}
  };

  const returnProductModal = (
    <>
      {!image && (
        <div className=" flex flex-col gap-2 items-center justify-center">
          <div className="text-gray-500 text-lg font-100">
            Please scan the product you received
          </div>
          <button
            onClick={() => setScan(true)}
            className="bg-primary block text-white w-36 h-8 rounded font-100 "
          >
            Scan Product
          </button>
        </div>
      )}
      {scan && (
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
          mirrored
        >
          {({ getScreenshot }) => (
            <button
              onClick={() => {
                const imageSrc = getScreenshot();
                setImage(imageSrc);
                setStatus("Checking for damages!");
                hadnleReturns(imageSrc);
                setScan(false);

                console.log(imageSrc);
              }}
              className="border-white border-2 p-2 text-white font-100 rounded-lg text-base hover:bg-white hover:text-black"
            >
              Capture photo
            </button>
          )}
        </Webcam>
      )}
      {mes && (
        <div className=" text-xl  text-rose-500 font-100 flex flex-col gap-4">
          {mes}
          <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-2 border-t-black animate-spin"></div>
        </div>
      )}
      {status && (
        <div className=" text-xl  text-rose-500 font-100 flex flex-col gap-4">
          {status}
          <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-2 border-t-black animate-spin"></div>
        </div>
      )}
      {qr && <QRScanner setData={setUID} data={uid} />}
      {scanner && (
        <>
          <div className="flex flex-col items-center h-full gap-2">
            <div className="text-gray-400 text-center text-base font-100 ">
              Log your product by scanning the QR code you received, to check
              for returns
            </div>
            <button
              onClick={() => setQR(true)}
              className="w-36 h-10 font-700 border-2 border-white hover:bg-white hover:text-black rounded text-white"
            >
              Log In Product
            </button>
          </div>
        </>
      )}
    </>
  );

  const initateReturn=async(payload)=>{
     try {
      await initiateCustomerReturn({_uid:payload});
      setMes("The return process has been initiated!Have a good day")
     } catch (error) {
      
     }
  }

  React.useEffect(()=>{
    if(uid){
      setScanner(false)
     initateReturn(uid)
    }
  },[uid])
 
  return (
    <>
      <div className={`bg-black h-[80px] z-[100] `}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <div className={`${styles.secure} font-100`}>
              Secure<span>DePaRT</span>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <div>
              {!user ? (
                <button
                  onClick={signIn}
                  className="w-36 text-primary hover:bg-primary hover:text-white text-base border-2 h-10 bg-transparent  font-100 border-primary rounded"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={signOut}
                  className="w-36 text-primary hover:bg-primary hover:text-white text-base border-2 h-10 bg-transparent  font-100 border-primary rounded"
                >
                  Log out
                </button>
              )}
            </div>
            {router.pathname.includes("user") && (
              <button
                onClick={() => setShow(true)}
                className="w-48 text-white hover:bg-white hover:text-black border-2  text-base  h-10 bg-transparent  font-100 rounded"
              >
                Return your product
              </button>
            )}
          </div>
            <div className="flex items-center justify-center">
              <a href="/">
                <Image
                  src={"/icons/git.svg"}
                  width={28}
                  height={28}
                  layout="intrinsic"
                  objectFit="contain"
                />
              </a>
            </div>
          </div>
        </div>
      
      {show && <SideModal content={returnProductModal} setShow={setShow} title={"Product Returns"} />}
      <ToastContainer/>
    </>
  );
}
