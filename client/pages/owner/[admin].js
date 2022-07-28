import React from 'react'
import Hero from "../../Components/Hero";
import SideModal from "../../Components/SideModal";
import TextBox, { CustomSelect } from "../../Components/TextBox";

const ROLES=[
  "Manufacturer",
  "Warehouse",
  "Delivery Boy",
  "Customer"
]
const Admin = () => {
  const [show,setShow]=React.useState(false);
  const [roles,setRoles]=React.useState({});
  const addProduct = (
    <>
    <div className='flex flex-col gap-4 min-h-[550px] justify-between'>

      <div className="flex flex-col gap-4 ">
        <TextBox
          lable={"Address"}
          placeholder={"Account address"}
          action={(e) => setRoles({ ...roles, _address: e.target.value })}
        />
        {roles._role === "Manufacturer" && (
          <>
            <TextBox
              lable={"Name"}
              placeholder={"Name"}
              action={(e) =>
                setRoles({ ...roles, _manufacturerName: e.target.value })
              }
            />
            <TextBox
              lable={"GSTIN"}
              placeholder={"GSTIN"}
              action={(e) =>
                setRoles({ ...roles, _manufacturerDetails: e.target.value })
              }
            />
            <TextBox
              lable={"Location"}
              placeholder={"Your location"}
              action={(e) => setRoles({ ...roles, _location: e.target.value })}
            />
          </>
        )}
        {roles._role === "Warehouse" && (
          <>
            <TextBox
              lable={"Warehouse Manage Name"}
              placeholder={"name"}
              action={(e) => setRoles({ ...roles, _wareHouse: e.target.value })}
            />
            <TextBox
              lable={"Warehouse Location"}
              placeholder={"location"}
              action={(e) =>
                setRoles({ ...roles, _warehouseLocation: e.target.value })
              }
            />
          </>
        )}
        {roles._role === "Delivery Boy" && <></>}
        {roles._role === "Customer" && <></>}
      </div>
        <button className="bg-primary p-2 block text-white font-100 rounded-lg text-base">
          Add Role
        </button>
    </div>
    </>
  );
  console.log(roles);
  const HeroContent = (
    <>
    <div className='max-w-screen-md w-full '>
      
      <CustomSelect
        action={(e) => setRoles({ _role: e.target.value })}
        list={ROLES}
        defaultValue="Select a role to add"
       />
        </div>
    </>
  );
  return (
    <>
    <Hero 
    img={"delivery.png"}
    des={"You have successfully logged in as admin!"}
    lable={"Add Role"}
    action={()=>setShow(true)}
    content={HeroContent}
    />
    {show && <SideModal content={addProduct} setShow={setShow} title={"Add Role"}/>}
    </>
  )
}

export default Admin