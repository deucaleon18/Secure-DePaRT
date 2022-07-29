import {useMoralis} from 'react-moralis'
import { ABI, CONTRACT_ADDRESS } from '../constants'
import { sha256} from "js-sha256";


export const runContractFunction=async (functionName,params)=>{
    const {Moralis}=useMoralis();
    try {
        let options = {
          contractAddress: CONTRACT_ADDRESS,
          functionName: functionName,
          abi: ABI,
          params: params,
        };
        let res = await Moralis.executeFunction(options);
        return res;
    } catch (error) {
        let er={
            code:error.code,
            message:error.message
        }
        return er;
    }
   
}


// Using SHA-256 generates a Unique ID using user_data as payload
export const generateUID=(payload)=>{
   let ab=sha256.create(payload);
   
   return ab.hex();
}