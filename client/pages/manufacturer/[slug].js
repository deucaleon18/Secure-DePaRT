import React from "react";
import Hero from "../../Components/Hero";
import SideModal from "../../Components/SideModal";
import TextBox, { CustomSelect } from "../../Components/TextBox";

const WARRANTY_PERIOD=[
  "1 Month","2 Months","6 Months","1 Year","5 Year"
]
const Manufacturer = () => {
  const [show,setShow]=React.useState(false);
  const [product,setProduct]=React.useState({})
  const ref=React.useRef(null)
  const addProduct = (
    <>
      <div className="flex flex-col gap-4 ">
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
            setProduct({ ...product, productPrice: e.target.value })
          }
        />
        <TextBox
          lable={"Quantity"}
          type={"Number"}
          placeholder={"Enter product quantity"}
          action={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
        <TextBox
          lable={"Warrant Period"}
          type={"Number"}
          placeholder={"Enter warranty period"}
          action={(e) =>
            setProduct({ ...product, warrantyPeriod: e.target.value })
          }
        />
        <CustomSelect
          action={(e) =>
            setProduct({ ...product, warrantyPeriod: e.target.value })
          }
          list={WARRANTY_PERIOD}
          lable={"Warrant Period"}
        />
       
        <input
          ref={ref}
          className="hidden"
          onChange={(e) =>
            setProduct({ ...product, images: e.target.files[0] })
          }
          type={"file"}
        />
        {/* <div className="flex gap-2">
         <div></div>  
        </div> */}
        <button className="bg-primary p-2 text-white font-100 rounded-lg text-base">
          Ship product
        </button>
      </div>
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
