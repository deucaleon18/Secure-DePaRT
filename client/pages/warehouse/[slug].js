import React, { useState } from "react";
import Hero from "../../Components/Hero";
import SideModal from "../../Components/SideModal";
import Webcam from "react-webcam";
import QRScanner from "../../Components/QRScan";
import { checkInProduct, packageCheck } from "../../services/productServices";
import { toast } from "react-toastify";
const WareHouse = () => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState();
  const [scan, setScan] = useState(false);
  const [image, setImage] = useState();
  const [status,setStatus]=useState();
  const checkIn = async (payload) => {
    let res = await packageCheck({
      name: "product_scan",
      image: payload,
    });
    if (res!="False") {
      toast.success('Package Undamaged!')
      setStatus('Package in good condition. No need for returns!')
      let response = {
        _state: 6,
        _uid: product,
        pointName: "WareHouse",
      };

      let r=await checkInProduct(response)
    }else{
      toast.error('Package Damaged! Initiating Return.')
      setStatus("Pacakge Damaged!Initiating return..")
    }
  };
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const checkInContent = (
    <>
    {!status && <>
      {!product && (
        <>
          {scan && <QRScanner setData={setProduct} />}
          <div className="flex flex-col items-center h-full gap-2">
            <div className="text-gray-400 text-center text-base font-100 ">
              Log your product by scanning the QR code you received, to check for returns
            </div>
            <button
              onClick={() => setScan(true)}
              className="w-36 h-10 font-700 border-2 border-white hover:bg-white hover:text-black rounded text-white"
            >
              Log In Product
            </button>
          </div>
        </>
      )}
      {product && (
        <>
          <div className="flex flex-col gap-4">
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
                    
                    setScan(false);
                    console.log(imageSrc);
                  }}
                  className="border-white border-2 p-2 text-white font-100 rounded-lg text-base hover:bg-white hover:text-black"
                >
                  Capture photo
                </button>
              )}
            </Webcam>
          <button disabled={image?false:true} onClick={()=>checkIn(image)}  className="w-full h-10 font-100 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent border-primary border-2 text-primary hover:bg-primary hover:text-white rounded">
            Update Product Status
          </button>
          </div>
        </>
      )}
    </>}
    </>
  );
  return (
    <>
      <Hero
        img={"warehouse.png"}
        des={"You have successfully logged in through a wareHouse account"}
        lable={"Check in product"}
        action={() => setShow(true)}
      />
      {show && <SideModal
        content={checkInContent}
        show={show}
        setShow={setShow}
        title={"Check-In Product"}
      />}
    </>
  );
};

export default WareHouse;
