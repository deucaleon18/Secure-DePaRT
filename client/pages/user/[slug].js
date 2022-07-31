import React, { useState,useEffect } from "react";
import Hero from "../../Components/Hero";
import QRScanner from "../../Components/QRScan";
import SideModal from "../../Components/SideModal";
import { getProducts } from "../../services/productServices";

const Customer = () => {
  const [scan, setScan] = useState(false);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState();
  const [productHistory,setProductHistory]=useState();
  const trackOrderContent = (
    <>
      {!product && (
        <>
          <div className=" flex flex-col gap-2 items-center justify-center">
            <div className="text-gray-500 text-lg font-100">
              Please scan the qr code received with your order
            </div>
            <button
              onClick={() => setScan(true)}
              className="bg-primary block text-white w-36 h-8 rounded font-100 "
            >
              Scan QR
            </button>
          </div>
        </>
      )}
      {scan && !product && <QRScanner data={product} setData={setProduct} />}
      {productHistory && (
        <>
          <div className="flex gap-2">
            <div className="text-green-500  re text-base font-700">
              Current Status
            </div>:
            <div className="text-white text-base font-100">{productHistory}</div>
          </div>
        </>
      )}
    </>
  );

  
  const getData=async()=>{
    let res=await getProducts(product);
    const {history} =res;
    setProductHistory(history[history.length-1].pointName)
  }


  useEffect(()=>{
     if(product){
     getData();
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
