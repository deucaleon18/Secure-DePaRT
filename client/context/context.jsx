import React from "react";
import { CONTRACT_ADDRESS, OWNER } from "../constants";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Web3 from "web3";
import ABI from "../constants/abi.json";
import { useEffect } from "react";

const AUTH_CONTEXT = React.createContext();

export const web3Provider = new Web3(
  Web3.givenProvider || "http://localhost:8545"
);
export const Contract = new web3Provider.eth.Contract(ABI, CONTRACT_ADDRESS);
export const Provider = ({ children }) => {
  const router = useRouter();
  const [user,setUser]=useState();
  const getRole = async (_address) => {
    if (_address == OWNER) {
      router.push(`/owner/${_address}`);
      return;
    }
    try {
      let data = await Contract.methods.getRole(_address).call();
      console.log(data);
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
          router.push(`/user/${_address}`);
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

  const signIn = async () => {
    if(!user){

      const accounts = await web3Provider.eth.requestAccounts();
      console.log(accounts);
      setUser(accounts[0]);
      localStorage.setItem('user',accounts[0]);
      getRole(accounts[0]);
    }
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser()
    router.replace("/");
  };

  useEffect(()=>{
    if(localStorage.getItem('user')){
       getRole(localStorage.getItem('user'));
       setUser(localStorage.getItem('user'));
    }
  },[])
  
  return (
    <>
      <AUTH_CONTEXT.Provider value={{ signIn,user, signOut, user}}>
        {children}
        
      </AUTH_CONTEXT.Provider>
    </>
  );
};

export default AUTH_CONTEXT;
