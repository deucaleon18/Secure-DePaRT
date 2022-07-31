import { web3Provider, Contract } from "../context/context";

export const updateManufacturerData = async (payload) => {
  let { _uid, _manufacturerName, _manufacturerDetails, _location, _address } =
    payload;

  try {
    const accounts = await web3Provider.eth.requestAccounts();
    await Contract.methods
      .addManufacturer(
        _uid,
        _address,
        _manufacturerName,
        _manufacturerDetails,
        _location
      )
      .send({ from: accounts[0] })
      .then((data) => console.log("added : ", data))
      .catch((err) => console.log(err.message));
  } catch (error) {
    console.log(error);
  }
};

export const addProductServices = async (payload) => {
  try {
    let lat="", long="";
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       lat = position.coords.latitude;
    //       long = position.coords.longitude;
    //       console.log(position)
    //     },
    //     (err) => {
    //       alert(err);
    //     }
    //   );
    // }
    const accounts = await web3Provider.eth.requestAccounts();
    const {
      _uid,
      productName,
      productPrice,
      quantity,
      _owner,
      warrantyPeriod,
    } = payload;
    await Contract.methods
      .addProducts(
        _uid,
        productName,
        productPrice,
        quantity,
        _owner,
        accounts[0],
        warrantyPeriod,
        false,
        20,
        80,
        "Product Shipped By Manufacturer"
      )
      .send({ from: accounts[0] })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  } catch (error) {}
};
