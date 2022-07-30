import React, { useState } from 'react'
import Hero from '../../Components/Hero'
import SideModal from '../../Components/SideModal';

const WareHouse = () => {
  const [show,setShow]=useState(false);

  return (
    <>
      <Hero
        img={"warehouse.png"}
        des={"You have successfully logged in through a wareHouse account"}
        lable={"Check in product"}
        action={()=>setShow(true)}
      />
      <SideModal title={"Check-In Product"}/>
    </>
  );
}

export default WareHouse