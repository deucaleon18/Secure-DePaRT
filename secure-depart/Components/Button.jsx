import React from 'react'

const Button = ({lable}) => {
  return (
    <>
    <button className='px-8 text-white rounded font-semibold font-100 h-12 bg-primary'>{lable}</button>
    </>
  )
}

export default Button