import {useMoralis} from 'react-moralis'
import { ABI, CONTRACT_ADDRESS } from '../constants'



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