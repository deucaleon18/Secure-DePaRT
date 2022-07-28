import React from 'react'
import Hero from "../../Components/Hero";
import SideModal from "../../Components/SideModal";
import TextBox, { CustomSelect } from "../../Components/TextBox";

const ROLES=[
  "No Role",
  "Manufacturer",
  "Warehouse",
  "Delivery Boy",
  "Customer"
]
const Admin = () => {
  const [show,setShow]=React.useState(false);
  const [roles,setRoles]=React.useState("");
  const ref=React.useRef(null)
  const addProduct = (
    <>
      <div className="flex flex-col gap-4 ">
        <CustomSelect
          action={(e) =>
            setRoles(e.target.value)
          }
          list={ROLES}
          lable={"Roles"}
        />
   
        {roles==="Manufacturer" ? (
          <div>
                <TextBox
          lable={"Address"}
          placeholder={"Enter wallet Address"}
          action={(e) =>
            setRoles({ ...roles, productName: e.target.value })
          }
        />
             Manufacturer</div> ): <></>
        }
             {roles==="Warehouse" ? (
          <div>Warehouse</div> ): <></>
        }
             {roles==="Delivery Boy" ? (
          <div>Delivery Boy</div> ): <></>
        }
             {roles==="Customer" ? (
          <div>Customer</div> ): <></>
        }
        </div>
        </>

  );
  console.log(roles);
  return (
    <>
    <Hero 
    img={"delivery.png"}
    des={"You have successfully logged in as admin!"}
    lable={"Add Roles"}
    action={()=>setShow(true)}
    />
    {show && <SideModal content={addProduct} setShow={setShow} title={"Add Roles"}/>}
    </>
  )
}

export default Admin