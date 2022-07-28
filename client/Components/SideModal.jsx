import React from "react";
import { motion } from "framer-motion";
const SideModal = ({content,title,setShow}) => {
  return (
    <>
      <div className="fixed z-[1000] top-0 w-screen h-screen bg-neutral-800/60">
        <motion.div
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          transition={{ type: "tween", delay: 0.5 }}
          className="w-1/3 h-screen bg-black text-white ml-auto"
        >
          <div className="flex flex-col h-screen p-8 gap-8 overflow-y-auto">
            <div className="flex justify-between">
              <div className="text-3xl font-700">{title}</div>
              <div className="cursor-pointer" onClick={()=>setShow(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="">

            {content}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SideModal;
