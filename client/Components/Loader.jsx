import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Loader = () => {
  return (
    <>
    <div className="w-screen z-[12121212] flex items-center justify-center h-screen fixed bg-gray-200/50">
      <ClipLoader
        color={"#000"}
        size={150}
        />
        </div>
    </>
  );
}

export default Loader