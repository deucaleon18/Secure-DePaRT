import React, { Component } from "react";
import { useMoralis } from "react-moralis";
import { CONTRACT_ADDRESS } from "../constants";
import {useRouter} from 'next/router'
import { runContractFunction } from "../utils/services";
const AUTH_CONTEXT = React.createContext();
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_uid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_manufactureName",
        type: "string",
      },
    ],
    name: "ManufactureAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_uid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_productName",
        type: "string",
      },
    ],
    name: "ProductsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum Structure.Roles",
        name: "_role",
        type: "uint8",
      },
    ],
    name: "RoleAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_uid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_Manufacturer",
        type: "address",
      },
      {
        internalType: "string",
        name: "_manufacturerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_manufacturerDetails",
        type: "string",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
    ],
    name: "addManufacture",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_uid",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_productName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_productPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_manufacturer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_warrantyPeriod",
        type: "uint256",
      },
    ],
    name: "addProducts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "enum Structure.Roles",
        name: "_role",
        type: "uint8",
      },
    ],
    name: "addRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getRole",
    outputs: [
      {
        internalType: "enum Structure.Roles",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "manufacture",
    outputs: [
      {
        internalType: "uint256",
        name: "uid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "Manufacturer",
        type: "address",
      },
      {
        internalType: "string",
        name: "manufacturerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "manufacturerDetails",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "products",
    outputs: [
      {
        internalType: "uint256",
        name: "uid",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "productPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "warrantyPeriod",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "role",
    outputs: [
      {
        internalType: "enum Structure.Roles",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "warehouse",
    outputs: [
      {
        internalType: "address",
        name: "Warehouse",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "warehouseManager",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "WarehouseLocation",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const Provider = ({ children }) => {
  const router=useRouter();
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
    Moralis
  } = useMoralis();
  const addRole=async (_address,_role)=>{
    try {
      let options={
        contractAddress:CONTRACT_ADDRESS,
        abi:ABI,
        functionName:'addRole',
        params:{
          _address:_address,
          _role:_role,
        }
      }
      let res=await Moralis.executeFunction(options);
    } catch (error) {
      
    }
  }
  const getRole=async (_address)=>{

      try {
        let options = {
          contractAddress: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "getRole",
          params: {
            _address:_address,
          },
        };
        console.log(_address)
        let data = await runContractFunction("getRole", { _address: _address });
        console.log("Current Role :", data);
        switch(data){
          case 1:
            router.push(`/manufacturer/${_address}`);
          break;
          case 2:
            router.push(`/warehouse/${_address}`);
            break;
          case 3:
            router.push(`/delivery/${_address}`);
            break;
          case 4:
            router.push(`/customer/${_address}`);
            break;
            default:
              alert('No such role exists!')
        }
      } catch (error) {
        let er={
          code:error.code,
          message:error.message
        }
        alert(error)
      }
      
    
  }


  const signIn = async () => {

    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
           getRole(user.get('ethAddress'));
          //addRole(user.get("ethAddress"),"Manufacturer")
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const signOut=()=>{
    logout();
    router.replace('/');
  }
  return (
    <>
      <AUTH_CONTEXT.Provider value={{signIn,signOut}}>{children}</AUTH_CONTEXT.Provider>
    </>
  );
};


export default AUTH_CONTEXT;