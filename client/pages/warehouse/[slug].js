import React, { useState } from 'react'
import Hero from '../../Components/Hero'
import SideModal from '../../Components/SideModal';
import Webcam from "react-webcam";
import QRScanner from '../../Components/QRScan';
const WareHouse = () => {
  const [show,setShow]=useState(false);
  const [product,setProduct]=useState()
  const [scan,setScan]=useState(false)
  const checkInProduct=()=>{
     let payload={
      _state:5,
      _uid:product,
      pointName:"WareHouse"
     }
  }
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const checkInContent = (
    <>
      {product ? (
        <>
          {scan && <QRScanner setData={setProduct} />}
          <button
            onClick={() => setScan(true)}
            className="w-36 h-10 border-2 border-white rounded text-white"
          >
            Product ID
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <Webcam
              audio={false}
              height={720}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <button
                  onClick={() => {
                    const imageSrc = getScreenshot();
                    console.log(imageSrc);
                  }}
                  className="border-white border-2 p-2 text-white font-100 rounded-lg text-base"
                >
                  Capture photo
                </button>
              )}
            </Webcam>
            <button className="bg-primary p-2 text-white font-100 rounded-lg text-base">
              Log Product
            </button>
          </div>
        </>
      )}
    </>
  );
  return (
    <>
      <Hero
        img={"warehouse.png"}
        des={"You have successfully logged in through a wareHouse account"}
        lable={"Check in product"}
        action={()=>setShow(true)}
      />
      <SideModal content={checkInContent} show={show} setShow={setShow} title={"Check-In Product"}/>
    </>
  );
}

export default WareHouse