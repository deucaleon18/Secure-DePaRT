import { web3Provider,Contract } from "../context/context";

export const updateWareHouseData=async (payload)=>{
      let {
        _address,
        _wareHouse,
        _wareHouseLocation,
      } = payload;

     try {
       const accounts = await web3Provider.eth.requestAccounts();
        await Contract.methods
          .addWarehouse(_address, _wareHouse, _wareHouseLocation)
          .send({ from: accounts[0] })
          .then((data) => console.log("added : ", data))
          .catch((err) => console.log(err.message))
     } catch (error) {
       console.log(error);
     }
}