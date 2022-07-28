import React from 'react'

const TextBox = ({type,action,lable,placeholder,error,val}) => {
  return (
    <div className='flex flex-col gap-2 w-full rounded'>
      <div className="text-gray-600 font-700 text-sm">{lable}</div>
     <input placeholder={placeholder}  onChange={action} value={val} type={type || "text"} className="border-2 border-gray-700 rounded-lg w-full bg-transparent outline-none p-2 text-white font-100 text-sm  font-medium" />
    </div>
  )
}


export const CustomSelect=({lable,list,action,defaultValue})=>{
  return (
    <>
      <div className="flex flex-col gap-2 w-full rounded">
        {lable && <div className="text-gray-600 font-700 text-sm">{lable}</div>
}       
        <select  onChange={action} className=" bg-black p-2 rounded-lg border-2 text-white border-gray-700 outline-none">
          {defaultValue && <option selected disabled >{defaultValue}</option>}
          {list.map(item=><option key={item} value={item}>{item}</option>)}
        </select>
      </div>
    </>
  );
}


export default TextBox