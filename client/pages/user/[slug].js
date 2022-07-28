import React, { useState } from "react";
import Hero from "../../Components/Hero";
import QRScanner from "../../Components/QRScan";

const Customer = () => {
  const [qr, setQr] = useState(false);

  return (
    <>
      <Hero
        img={"customer.png"}
        des="Welcome back, dear customer ! "
        lable={"Track your order"}
        action={() => setQr(true)}
      />
      {/* {qr ? (
        <div className="w-screen h-screen absolute z-[999]">
          <QRScanner />
        </div>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default Customer;
