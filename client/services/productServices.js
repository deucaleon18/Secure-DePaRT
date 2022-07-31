import { OWNER } from "../constants";
import { web3Provider, Contract } from "../context/context";
import { BASE_URL } from "../constants";
export const getRoles = async (_address) => {
  if (_address == OWNER) {
  }
  try {
  } catch (error) {}
};

export const checkInProduct = async (payload) => {
  try {
    const accounts = await web3Provider.eth.getAccounts();
    const { _state, pointName, _uid } = payload;
    await Contract.methods
      .updateProductHistory(_uid, _state, 0, 0, 10, pointName)
      .send({ from: accounts[0] });
  } catch (error) {
    console.log(error);
  }
};

export const initiateReturn = async (payload) => {
  try {
    const accounts = await web3Provider.eth.getAccounts();
    const { _uid } = payload;
    await Contract.methods.packageDamaged(_uid).send({ from: accounts[0] });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts=async(payload)=>{
   try {
   await Contract.methods.getProducts(payload).call().then(data=>console.log(data)).catch(err=>console.log(err))
   } catch (error) {
    console.log(error)
   }
}

export const initiateCustomerReturn=async (payload)=>{
    try {
        const accounts=await web3Provider.eth.getAccounts();
        const {_uid}=payload;
        await Contract.methods.userReturn(_uid).send({from:accounts[0]});
    } catch (error) {
        console.log(error)
    }
}

export const packageCheck=async(payload)=>{
    return true;
   try {
    let body=JSON.stringify(payload)
     let res=await fetch(BASE_URL,{
        method:"POST",
        body:body,
        headers:{
            "Content-Type":"application/json",
        }
     })
     let result= await res.json();
     return result;
   } catch (error) {
     console.log(error);
   }
}