import { CONTRACT_ADDRESS } from "../constants";
import abi from "../constants/abi.json";
import { sha256 } from "js-sha256";
import Web3 from "web3";

//Function to call Read-Only methods of the contract
export const runContractFunction = async (functionName, params) => {
  const provider = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await provider.eth.requestAccounts();
  const contract = new provider.eth.Contract(abi, CONTRACT_ADDRESS, {
    from: accounts[0],
  });
  try {
    let res = await contract.methods[functionName]([params]).call();
    return res;
  } catch (error) {
    return error;
  }
};

//Function to call Write methods of the contract
export const executeFunction = async (functionName, params) => {
  const provider = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await provider.eth.requestAccounts();
  const contract = new provider.eth.Contract(abi, CONTRACT_ADDRESS, {
    from: accounts[0],
  });
  try {
    let res = await contract.methods[functionName](params).send({
      from: accounts[0],
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const createContract = async (payload) => {};

export const addProductService = async (payload) => {
  const provider = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await provider.eth.requestAccounts();
  const contract = new provider.eth.Contract(abi, CONTRACT_ADDRESS, {
    from: accounts[0],
  });
  console.log(accounts,contract,provider)
  const {
    _uid,
    _productName,
    _productPrice,
    _quantity,
    _owner,
    _warrantyPeriod,
  } = payload;
  let res = await contract.methods.addProducts(
    _uid,
    _productName,
    _productPrice,
    _quantity,
    _owner,
    accounts[0],
    _warrantyPeriod,
    0,
    20,80,"Product Shipped By Manufacturer"
  ).send({from:accounts[0]});
  console.log(res)
};
// Using SHA-256 generates a Unique ID using user_data as payload
export const generateUID = (payload) => {
  let ab = sha256.create(payload);

  return ab.hex();
};
