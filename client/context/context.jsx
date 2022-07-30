import React, { Component } from "react";
import { CONTRACT_ADDRESS, OWNER } from "../constants";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Web3 from 'web3'
import { useEffect } from "react";
import { executeFunction } from "../utils/services";
import ABI from '../constants/abi.json'
const AUTH_CONTEXT = React.createContext();


export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [users,setUsers]=useState()
  const [contractInstance,setContractInstance]=useState();
  // const [signer,setSigner]=useState();
  const provider = new Web3(Web3.givenProvider || "http://localhost:8545");
  // const[contract,setContract]=useState()
  const addRole = async (_address, _role) => {
    console.log(_address, _role);
    setLoading(true);
    const accounts = await provider.eth.requestAccounts();
     let contract = new provider.eth.Contract(ABI, CONTRACT_ADDRESS,{from:accounts[0]});
    await contract.methods
      .addRole(_address, _role)
      .send({ from: accounts[0] })
      .then((data) => console.log("ROLE : ", data))
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoading(false);
     });
    
  };;


  const updateRoleData = async (_role, payload) => {
    console.log(_role,payload)
    console.log(typeof(_role))
    try {
 
      //  let options = {
      //    contractAddress: CONTRACT_ADDRESS,
      //    abi: ABI,
      //    functionName: `add${_role}`,
      //   params: {
      //     ...payload,
      //   },
      //  };
      // setLoading(true);
      // let res = await Moralis.executeFunction(options);
      const accounts = await provider.eth.requestAccounts();
      console.log(accounts)
      let contract = new provider.eth.Contract(ABI, CONTRACT_ADDRESS, {
        from: accounts[0],
      });
      console.log(contract)
      console.log(payload)
      
      let { _uid, _manufacturerName, _manufacturerDetails, _location,_address,_wareHouse ,_wareHouseLocation } = payload;
       switch(_role){
          case "1":
            await contract.methods.addManufacturer(_uid,_address,_manufacturerName,_manufacturerDetails,_location)
              .send({ from: accounts[0] })
              .then((data) => console.log("added : ", data))
              .catch((err) => console.log(err.message))
              .finally(() => {
                setLoading(false);
              });
       
         break;
         case "2":
          await contract.methods
            .addWarehouse(
              _address,
              _wareHouse,
              _wareHouseLocation
            )
            .send({ from: accounts[0] })
            .then((data) => console.log("added : ", data))
            .catch((err) => console.log(err.message))
            .finally(() => {
              setLoading(false);
            });
          break;
          default:
            console.log("error")
      }
     
      toast.success("Role Data Updated!");
     
    } catch (error) {
      
      toast.error(error.message);
    }
  };


  const getRole = async (_address) => {

    if (_address == OWNER) {
      router.push(`/owner/${_address}`);
      return;
    }
    try {
       let contract = new provider.eth.Contract(ABI, CONTRACT_ADDRESS);
      let data=await contract.methods.getRole(_address).call();
      console.log(data) 
      switch (data) {
        case "1":
          router.push(`/manufacturer/${_address}`);
          break;
        case "2":
          router.push(`/warehouse/${_address}`);
          break;
        case "3":
          router.push(`/delivery/${_address}`);
          break;
        case "4":
          router.push(`/customer/${_address}`);
          break;
        default:
          alert("No such role exists!");
      }
    } catch (error) {
      let er = {
        code: error.code,
        message: error.message,
      };
      toast.error(error.message);
    }
  };

const addProductService = async (payload) => {
  const accounts = await provider.eth.requestAccounts();
  const contract = new provider.eth.Contract(ABI, CONTRACT_ADDRESS, {
    from: accounts[0]
  });
  console.log(accounts, contract, provider,payload);

  const {
    _uid,
    productName,
    productPrice,
    quantity,
    _owner,
    warrantyPeriod,
  } = payload;
  console.log(contract.methods.addProducts)
  await contract.methods.addProducts(
      _uid,
      productName,
      productPrice,
      quantity,
      _owner,
      accounts[0],
      warrantyPeriod,
      false,
      20,
      80,
      "Product Shipped By Manufacturer"
    ).send({ from:accounts[0]}).then((data)=>console.log(data)).catch(err=>console.log(err));
  
};

  const signIn = async () => {
    const accounts = await provider.eth.requestAccounts();
    const networkID = await provider.eth.net.getId();
  
      let contract = new provider.eth.Contract(ABI, CONTRACT_ADDRESS);
      console.log(contract);
     
   

    getRole(accounts[0]);
  };


  const signOut = () => {

    router.replace("/");
  };




  return (
    <>
      <AUTH_CONTEXT.Provider
        value={{ signIn, signOut, addRole, updateRoleData, loading ,addProductService}}
      >
        {children}
      </AUTH_CONTEXT.Provider>
    </>
  );
};

export default AUTH_CONTEXT;
