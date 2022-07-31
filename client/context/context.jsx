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
import { addProductServices, updateManufacturerData } from "../services/manufacturerServices";
import { updateWareHouseData } from "../services/wareHouseServices";
const AUTH_CONTEXT = React.createContext();

export const web3Provider = new Web3(Web3.givenProvider || "http://localhost:8545");
export const Contract=new web3Provider.eth.Contract(ABI,CONTRACT_ADDRESS)
export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addRole = async (_address, _role) => {
    console.log(_address, _role);
    setLoading(true);
    const accounts = await web3Provider.eth.requestAccounts();
     let contract = new web3Provider.eth.Contract(ABI, CONTRACT_ADDRESS,{from:accounts[0]});
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
    // console.log(_role,payload)
    // console.log(typeof(_role))
    try {
      // console.log(payload)
       switch(_role){
          case "1":
          await updateManufacturerData(payload)
         break;
         case "2":
          await updateWareHouseData(payload)
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
      //  let contract = new web3Provider.eth.Contract(ABI, CONTRACT_ADDRESS);
      let data=await Contract.methods.getRole(_address).call();
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
  await addProductServices(payload)
  // const accounts = await web3Provider.eth.requestAccounts();
  // const contract = new web3Provider.eth.Contract(ABI, CONTRACT_ADDRESS, {
  //   from: accounts[0]
  // });
  // console.log(accounts, contract, provider,payload);

  // const {
  //   _uid,
  //   productName,
  //   productPrice,
  //   quantity,
  //   _owner,
  //   warrantyPeriod,
  // } = payload;
  // console.log(contract.methods.addProducts)
  // await Contract.methods.addProducts(
  //     _uid,
  //     productName,
  //     productPrice,
  //     quantity,
  //     _owner,
  //     accounts[0],
  //     warrantyPeriod,
  //     false,
  //     20,
  //     80,
  //     "Product Shipped By Manufacturer"
  //   ).send({ from:accounts[0]}).then((data)=>console.log(data)).catch(err=>console.log(err));
  
};

  const signIn = async () => {
    const accounts = await web3Provider.eth.requestAccounts();
    console.log(accounts)
    getRole(accounts[0]);
  };


  const signOut = () => {

    router.replace("/");
  };



  return (
    <>
      <AUTH_CONTEXT.Provider
        value={{ signIn, signOut,loading}}
      >
        {children}
      </AUTH_CONTEXT.Provider>
    </>
  );
};

export default AUTH_CONTEXT;
