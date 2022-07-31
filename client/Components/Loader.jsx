import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Loader = () => {
  return (
    <>
      <div className="w-full fixed top-0 z-[12121212] flex items-center justify-center h-screen bg-gray-100/20">
        <ClipLoader color={"#F0137D"} size={50} />
      </div>
    </>
  );
}

export default Loader