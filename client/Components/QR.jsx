import React,{useState,useEffect} from 'react'
import QRcode from 'qrcode.react'



const QR = ({payload,show}) => {
    

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

    
    const [qr, setQr] = useState(payload || '');
    const [Qrdiv,setQrdiv]=useState(show || false)


    // useEffect(()=>{
    
    //  const changeQR
    //    setQr("djajasjdo")
    //    setQrdiv(true)
    // },[])
   
    
  return (


    <>
        
        
       
                {
                Qrdiv &&(
                <div className='flex flex-col gap-8 w-full items-center justify-center'>
                <QRcode 
                        id="myqr"
                        value={qr} 
                        size={320}
                        includeMargin={true}
                    /> 
                    <button onClick={()=>{downloadQR()}}  className="w-full hover:font-700  hover:bg-white hover:text-black h-8 border-2 border-white rounded text-white font-100" >Download QR</button>        
                    </div>
                    )
                 }
          



    </>
  )
}

export default QR