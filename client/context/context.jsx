import React, { Component } from "react";
import { CONTRACT_ADDRESS, OWNER } from "../constants";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Web3 from 'web3'
import { useEffect } from "react";

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
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "DeliveryBoyAdded",
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
        internalType: "string",
        name: "_warehouseManager",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_warehouseLocation",
        type: "string",
      },
    ],
    name: "WareHouseAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "addDeliveryboy",
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
        internalType: "address",
        name: "_address",
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
    name: "addManufacturer",
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
      {
        internalType: "bool",
        name: "_warrentyExpire",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "latitude",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "longitude",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "pointName",
        type: "string",
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
      {
        internalType: "string",
        name: "_warehouseManager",
        type: "string",
      },
      {
        internalType: "string",
        name: "_warehouseLocation",
        type: "string",
      },
    ],
    name: "addWarehouse",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "delivery",
    outputs: [
      {
        internalType: "address",
        name: "delivery",
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
        internalType: "uint256",
        name: "_uid",
        type: "uint256",
      },
      {
        internalType: "enum Structure.State",
        name: "_state",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "latitude",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "longitude",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "returnStatus",
        type: "bool",
      },
      {
        internalType: "string",
        name: "pointName",
        type: "string",
      },
    ],
    name: "initiateProductHistory",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_uid",
        type: "uint256",
      },
    ],
    name: "packageDamaged",
    outputs: [],
    stateMutability: "nonpayable",
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
      {
        internalType: "bool",
        name: "warrantyExpire",
        type: "bool",
      },
      {
        internalType: "enum Structure.State",
        name: "productState",
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
        internalType: "uint256",
        name: "_uid",
        type: "uint256",
      },
      {
        internalType: "enum Structure.State",
        name: "_state",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "latitude",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "longitude",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "pointName",
        type: "string",
      },
    ],
    name: "updateProductHistory",
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
    ],
    name: "userReturn",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "warehouse",
        type: "address",
      },
      {
        internalType: "string",
        name: "warehouseManager",
        type: "string",
      },
      {
        internalType: "string",
        name: "warehouseLocation",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [provider,setProvider]=useState();
  const [users,setUsers]=useState()
  // const [signer,setSigner]=useState();
  // const[contract,setContract]=useState()

  const addRole = async (_address, _role) => {
    console.log(_address, _role);
    setLoading(true);
    let p = new Web3(Web3.givenProvider || "http://localhost:8545");
    let contract = new p.eth.Contract(ABI, CONTRACT_ADDRESS);
    const accounts = await p.eth.requestAccounts();
    await contract.methods
      .addRole(_address, _role)
      .send({ from: accounts[0] })
      .then((data) => console.log("ROLE : ", data))
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoading(false);
     });

    // let options = {
    //   contractAddress: CONTRACT_ADDRESS,
    //   abi: ABI,
    //   functionName: "addRole",
    //   params: {
    //     _address: _address,
    //     _role: parseInt(_role),
    //   },
    // };
    // Moralis.executeFunction(options)
    //   .then((data) => console.log("ROLE : ", data))
    //   .catch((err) => console.log(err.message))
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };;


  const updateRoleData = async (_role, payload) => {
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
      console.log(res)
      toast.success("Role Data Updated!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };


  const getRole = async (_address) => {

    if (_address[0] == OWNER) {
      router.push(`/owner/${_address}`);
      return;
    }
    try {
      let data = await Moralis.executeFunction({
        ...options,
        functionName: "getRole",
        params: {
          _address: _address,
        },
      });
      switch (data) {
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
    let p = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await p.eth.requestAccounts();
    const networkID = await p.eth.net.getId();
    try {
      let contract = new p.eth.Contract(ABI, CONTRACT_ADDRESS);
      console.log(contract);
    } catch (err) {
      console.error(err);
    }

    getRole(accounts);
    setProvider(p)
    // console.log("fff");
  };


  const signOut = () => {

    router.replace("/");
  };




  return (
    <>
      <AUTH_CONTEXT.Provider
        value={{ signIn, signOut, addRole, updateRoleData, loading }}
      >
        {children}
      </AUTH_CONTEXT.Provider>
    </>
  );
};

export default AUTH_CONTEXT;
