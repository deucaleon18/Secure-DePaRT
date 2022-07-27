import React from 'react'

export const useForm=(initial)=>{

    const [val,setVal]=React.useState(initial || "");

    const handleChange=(e)=>{
        setVal(e.target.value);
    }

    return {
        onChange:handleChange,
        value:val
    }
}

