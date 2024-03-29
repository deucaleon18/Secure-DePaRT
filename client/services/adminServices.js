import { web3Provider, Contract } from "../context/context";
import { updateManufacturerData } from "./manufacturerServices";
import { updateWareHouseData } from "./wareHouseServices";
export const addRoles = async (_address, _role) => {
  try {
    const accounts = await web3Provider.eth.requestAccounts();
    let res= await Contract.methods
      .addRole(_address, _role)
      .send({ from: accounts[0] })
      .then((data) =>data)
      .catch((err) => err.message);
      return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateRoledata = async (_role, payload) => {
  try {
    switch (_role) {
      case "1":
        await updateManufacturerData(payload);
        break;
      case "2":
        await updateWareHouseData(payload);
        break;
      default:
        console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
};
