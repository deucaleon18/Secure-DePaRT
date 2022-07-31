import React, { useState,useEffect } from "react";
import Hero from "../../Components/Hero";
import QRScanner from "../../Components/QRScan";
import SideModal from "../../Components/SideModal";
import { getProducts } from "../../services/productServices";

const Customer = () => {
  const [qr, setQr] = useState(false);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState();

  const trackOrderContent = (
    <>
      {!product && (
        <>
          <div className=" flex flex-col gap-2 items-center justify-center">
            <div className="text-gray-500 text-lg font-100">
              Please scan the qr code received with your order
            </div>
            <button
              onClick={() => setQr(true)}
              className="bg-primary block text-white w-36 h-8 rounded font-100 "
            >
              Scan QR
            </button>
          </div>
          {qr && <QRScanner data={product} setData={setProduct} />}
        </>
      )}
    </>
  );

  useEffect(() => {
    if(!show){
      setQr(false)
    }
  }, [show])
   
  useEffect(()=>{
     if(product){
      getProducts(product);
     }
  },[product])

  return (
    <>
      <Hero
        img={"customer.png"}
        des="Welcome back, dear customer ! "
        lable={"Track your order"}
        action={() => setShow(true)}
      />
      {show && (
        <SideModal
          setShow={setShow}
          content={trackOrderContent}
          title={"Track Order"}
        />
      )}
    </>
  );
};

export default Customer;
