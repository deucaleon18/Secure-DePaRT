import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import Hero from "../../Components/Hero";
import Loader from '../../Components/Loader';
import SideModal from "../../Components/SideModal";
import TextBox, { CustomSelect } from "../../Components/TextBox";
import { OWNER } from '../../constants';
import { addRoles } from '../../services/adminServices';
import {generateUID} from '../../utils/services'
import {ToastContainer} from 'react-toastify'
import { updateRoledata } from '../../services/adminServices';
const ROLES=[
  "Manufacturer",
  "Warehouse",
  "Delivery Boy",
  "Customer"
]
const Admin = () => {
  const [show,setShow]=React.useState(false);
  const [roles,setRoles]=React.useState({});
  const  [loading,setLoading]=React.useState(false)
  const router=useRouter();
  const handleSubmit=(e)=>{
    e.preventDefault();
    let _uid=generateUID(roles);
    const {_role,...rest}=roles;
    updateRoledata(_role,{
       _uid:_uid,
       ...rest
    })
  }
  const addProduct = (
    <>
      <div className="flex flex-col gap-4 min-h-[550px] justify-between">
        <div className="flex flex-col gap-4 ">
          {parseInt(roles._role) === 1 && (
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
                action={(e) =>
                  setRoles({ ...roles, _location: e.target.value })
                }
              />
            </>
          )}
          {parseInt(roles._role) === 2 && (
            <>
              <TextBox
                lable={"Warehouse Manage Name"}
                placeholder={"name"}
                action={(e) =>
                  setRoles({ ...roles, _wareHouse: e.target.value })
                }
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
          {parseInt(roles._role) === 3 && (
            <>
              <TextBox placeholder={"Account address"} val={roles._address} />
            </>
          )}
          {parseInt(roles._role) === 4 && (
            <>
              <TextBox placeholder={"Account address"} val={roles._address} />
            </>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-primary p-2 block text-white font-100 rounded-lg text-base"
        >
          Add Role
        </button>
      </div>
    </>
  );
  const validate=async()=>{
    if(roles._address && roles._role){
      setLoading(true)
      let res=await addRoles(roles._address,roles._role);
      console.log(res,"this is res")
      setLoading(false);
      toast.success('Role added successfully')
      setShow(true);

    }else{
      toast.error('Please fill all the details!');
    }
  }
  const HeroContent = (
    <>
      <div className="max-w-screen-md w-full ">
        <CustomSelect
          action={(e) => setRoles({ _role: e.target.value })}
          list={ROLES}
          defaultValue="Select a role to add"
        />
        <TextBox
          
          placeholder={"Account address"}
          action={(e) => setRoles({ ...roles, _address: e.target.value })}
        />
      </div>
    </>
  );
  React.useEffect(()=>{
       generateUID({name:"abc",role:"manu"})
  },[])
  return (
    <>
      {router.query.admin == OWNER ? (
        <Hero
          img={"delivery.png"}
          des={"You have successfully logged in as admin!"}
          lable={"Add Role"}
          action={() =>validate()}
          content={HeroContent}
        />
      ) : (
        <>
          <Hero
            img={"delivery.png"}
            des={"You are unauthorized!"}
            lable={"Go back"}
            action={() => router.replace('/')}
          />
        </>
      )}
      {show && (
        <SideModal content={addProduct} setShow={setShow} title={"Add Role"} />
      )}
      {loading && <Loader/>}
      <ToastContainer/>
    </>
  );
}

export default Admin