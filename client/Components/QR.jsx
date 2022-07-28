import React,{useState,useEffect} from 'react'
import QRcode from 'qrcode.react'



const QR = () => {
    

    const downloadQR = () => {
        const canvas = document.getElementById("myqr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "myqr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    
    const [qr, setQr] = useState('sdfvsfadfa');
    const [Qrdiv,setQrdiv]=useState(true)


    // useEffect(()=>{
    
    //  const changeQR
    //    setQr("djajasjdo")
    //    setQrdiv(true)
    // },[])
   
    
  return (


    <div>
        
        
        <div>
                {
                Qrdiv &&(
                <div>
                <QRcode 
                        id="myqr"
                        value={qr} 
                        size={320}
                        includeMargin={true}
                    /> 
                    <button onClick={()=>{downloadQR()}}  className="btn btn-warning w-100" >Download QR</button>        
                    </div>
                    )
                 }
            </div>



    </div>
  )
}

export default QR