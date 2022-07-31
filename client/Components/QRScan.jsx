
import React, {useState} from 'react'
import {QrReader} from 'react-qr-reader'
// import axios from 'axios'


function QRScanner({setData,data}) {
    

   
    const [delayVar,setDelayVar]=useState(2000)

    const handleScan = async(data) => {
        // if (data) {
            // await axios.get(`http://localhost:8000/patient/details/${data}`)
            // .then((res)=>{
            //     // console.log(data)
            //     // console.log(res)
            //     window.location.href=`/patient/${res.data.details._id}`
            // })
           
            // .catch((err)=>{
            //     console.log(err)
            // })

            setDelayVar(10000000000000)
            setQrscan(data)
            console.log(data)
        // }
        
    }

    const handleError = err => {
    console.error(err)
    }
    
    return (
      <div>
    {!data && <QrReader
        onResult={(result, error) => {
        if (!!result) {
            setData(result?.text);
            console.log(result)
        }

        if (!!error) {
            console.info(error);
        }
        }}
        style={{ width: "100%" }}
    />}
      </div>
    );
  }
  
  export default QRScanner;
  