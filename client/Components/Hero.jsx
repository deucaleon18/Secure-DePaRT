import React from 'react'
import Image from 'next/image';
import Button from './Button';
const Hero = ({img,des,lable,action}) => {
  return (
    <>
      <div className="w-screen relative flex items-center justify-center h-[85vh]">
        <div className="bg-black absolute top-0 -z-40 w-full h-full"></div>
        <div className="max-w-[75vw] w-full h-full absolute top-0 m-auto">
          <Image
            src={`/Images/${img}`}
            layout="fill"
            objectFit="contain"
            className="-z-10  opacity-50"
          />
        </div>

        <div className="max-w-[75vw] bg-manufact  relative w-full h-[65vh]   m-auto">
          <div className="flex z-30  h-full w-full items-center gap-8 flex-col justify-center">
            <div className="text-white leading-loose leading-[54px] font-100 text-center text-5xl">
            {des}
            </div>
            <Button lable={lable} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero