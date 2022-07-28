import React from 'react'

const TextBox = ({action,lable,placeholder,error,val}) => {
  return (
    <div className='border-2 w-full rounded border-gray-700'>
     <input placeholder={placeholder}  onChange={action} value={val} type={"text"} className=" w-full bg-transparent outline-none p-2 text-gray-500 font-100 text-base font-medium" />
    </div>
  )
}

export default TextBox