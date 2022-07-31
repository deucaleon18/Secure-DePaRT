import React, { useContext } from "react";
import Hero from "../../Components/Hero";
import SideModal from "../../Components/SideModal";
import TextBox, { CustomSelect } from "../../Components/TextBox";
import QR from "../../Components/QR";
import { generateUID } from "../../utils/services";
import AUTH_CONTEXT from "../../context/context";
import { addProductServices } from "../../services/manufacturerServices";

const WARRANTY_PERIOD=[
  "1","2","6"
]

const Manufacturer = () => {
  const [show,setShow]=React.useState(false);
  const [product,setProduct]=React.useState({})
  const [qr,setQr]=React.useState({show:false,code:""});
  const ref=React.useRef(null)
  
  const handleAddProduct=(e)=>{
      e.preventDefault();
      let uid=generateUID(product);
      
      addProductServices({
        _uid:uid,
        ...product
      })
      setQr({
        show:true,
        code:uid
      })
  }
  const addProduct = (
    <>
     {!qr.show  && <div className="flex flex-col gap-4 ">
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
            setProduct({ ...product, warrantyPeriod: parseInt(e.target.value) })
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
          onClick={handleAddProduct}
          className="bg-primary p-2 text-white font-100 rounded-lg text-base"
        >
          Ship product
        </button>
      </div>}
      {qr.show && (
        <>
          <div className="flex w-full items-center justify-center">
            <QR show={qr.show} payload={qr.code} />
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
    </>
  );
};

export default Manufacturer;
