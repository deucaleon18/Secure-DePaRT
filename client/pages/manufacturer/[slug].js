import React, { useContext, useState } from "react";
import Hero from "../../Components/Hero";
import SideModal from "../../Components/SideModal";
import TextBox, { CustomSelect } from "../../Components/TextBox";
import QR from "../../Components/QR";
import { generateUID } from "../../utils/services";
import AUTH_CONTEXT from "../../context/context";
import { addProductServices } from "../../services/manufacturerServices";
import Webcam from "react-webcam";
import { packageCheck } from "../../services/productServices";
import { toast, ToastContainer } from "react-toastify";
const WARRANTY_PERIOD=[
  "1","2","6"
]
 const videoConstraints = {
   width: 1280,
   height: 720,
   facingMode: "user",
 };
const Manufacturer = () => {
  const [loading,setLoading]=useState(false);
  const [show,setShow]=React.useState(false);
  const [product,setProduct]=React.useState({})
  const [qr,setQr]=React.useState({show:false,code:""});
  const ref=React.useRef(null)
  const [scan,setScan]=useState(false);
  const [image,setImage]=useState();
  const [status,setStatus]=useState();
  const handleAddProduct=async (e)=>{
      e.preventDefault();
      
       try {
        setLoading(true)
        let res = await packageCheck({
          name: "product_scan",
          image: image,
        });
        setLoading(false)
        if(res!='False'){
          toast.success('Product is in good condition.Initiating Shippment!')
          setScan(false);
          setStatus('Product is in good condition.Initiating Shippment..')
          let uid = generateUID(product);
          await addProductServices({
            _uid: uid,
            ...product,
          });
          setQr({
            show: true,
            code: uid,
          });
        }else{
          toast.error('Product is damaged!Cannot be added');
          setStatus('Product is damaged.Cancelling Shippment...')
          setShow(false);
        }
       } catch (error) {
         toast.error(error);
       }
      
  }

  const handleScan=async()=>{
     setScan(true);
  }
  const addProduct = (
    <>
      {!qr.show && !scan && (
        <div className="flex flex-col gap-4 ">
          <TextBox
            lable={"Owner's Address"}
            placeholder={"Enter owner address"}
            action={(e) => setProduct({ ...product, _owner: e.target.value })}
          />
          <TextBox
            lable={"Product Name"}
            placeholder={"Enter product name"}
            action={(e) =>
              setProduct({ ...product, productName: e.target.value })
            }
          />
          <TextBox
            lable={"Product Price"}
            type={"Number"}
            placeholder={"Enter product price"}
            action={(e) =>
              setProduct({ ...product, productPrice: parseInt(e.target.value) })
            }
          />
          <TextBox
            lable={"Quantity"}
            type={"Number"}
            placeholder={"Enter product quantity"}
            action={(e) =>
              setProduct({ ...product, quantity: parseInt(e.target.value) })
            }
          />
          <TextBox
            lable={"Warranty Period"}
            type={"Number"}
            placeholder={"Enter warranty period"}
            action={(e) =>
              setProduct({
                ...product,
                warrantyPeriod: parseInt(e.target.value),
              })
            }
          />

          <input
            ref={ref}
            className="hidden"
            onChange={(e) =>
              setProduct({ ...product, images: e.target.files[0] })
            }
            type={"file"}
          />

          <button
            onClick={handleScan}
            className="bg-primary p-2 text-white font-100 rounded-lg text-base"
          >
            Scan & Ship product
          </button>
        </div>
      )}
      {scan && (
        <>
          <div className="flex flex-col gap-4">
            <div className="text-rose-500 text-lg  font-thin font-100">
              Let's scan your product for any damages!
            </div>
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
            <button
              disabled={!image}
              onClick={handleAddProduct}
              className="bg-primary disabled:bg-transparent disabled:border-2 disabled:border-gray-700 disabled:text-gray-700 text-white w-full h-10 rounded flex items-center justify-center gap-4 font-100"
            >
              Check for damages
              {loading && (
                <span className="w-6 h-6 rounded-full border-2 border-white-500 border-t-2 border-t-primary animate-spin"></span>
              )}
            </button>
          </div>
        </>
      )}
      {qr.show && !scan && (
        <>
          <div className="flex w-full items-center justify-center">
            <QR show={qr.show} payload={qr.code} />
          </div>
        </>
      )}
      {status && !qr.show && (
        <>
          <div className="min-h-[500px] text-xl  text-rose-500 font-100 flex flex-col gap-4">
            {status}
            <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-2 border-t-black animate-spin"></div>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <Hero
        img={"manufact.png"}
        des={" You have successfully logged in as a Manufacturer."}
        lable={"Add product"}
        action={()=>setShow(true)}
      />
      {show && <SideModal content={addProduct} setShow={setShow} title={"Add Product"}/>}
      <ToastContainer/>
    </>
  );
};

export default Manufacturer;
