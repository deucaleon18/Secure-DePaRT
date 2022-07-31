
import React, {useState} from 'react'
import {QrReader} from 'react-qr-reader'
// import axios from 'axios'


function QRScanner({setData,data}) {
    
    
    return (
      <div className='w-full'>
    {!data &&  <QrReader
    
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
  