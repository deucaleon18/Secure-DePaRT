
import React, {useState} from 'react'
import QrScan from 'react-qr-reader'
// import axios from 'axios'


function QRscanner() {
    

    const [qrscan, setQrscan] = useState('No result');
    const [delayVar,setDelayVar]=useState(2000)

    // const handleScan = async(data) => {
    //     if (data) {
    //         await axios.get(`http://localhost:8000/patient/details/${data}`)
    //         .then((res)=>{
    //             // console.log(data)
    //             // console.log(res)
    //             window.location.href=`/patient/${res.data.details._id}`
    //         })
           
    //         .catch((err)=>{
    //             console.log(err)
    //         })

    //         setDelayVar(10000000000000)
    //         setQrscan(data)
    //     }
    //    console.log(data)
       
        
    // }
    // const handleError = err => {
    // console.error(err)
    // }
    
    return (
      <div> 
        <center>
            <span>Find your Product</span>
            <div style={{marginTop:30}}>
                <QrScan
                    delay={delayVar}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: 240, width: 320 }}
                />
            </div>
            </center>
            <textarea
                style={{fontSize:18, width:320, height:100, marginTop:100}}
                rows={4}
                defaultValue={qrscan}
                value={qrscan}
            />

      </div>
    );
  }
  
  export default QRscanner;
  