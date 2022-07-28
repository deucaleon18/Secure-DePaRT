import React from 'react'
import Hero from '../../Components/Hero'
// import QRscanner from '../../Components/QRScan';

const Customer = () => {
  return (
    <>
      <Hero img={"customer.png"} des="Welcome back, dear customer ! " lable={"Track your order"} />
      {/* <QRscanner/> */}
    </>
  );
}

export default Customer