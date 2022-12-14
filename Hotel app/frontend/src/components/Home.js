import React, { useEffect } from 'react';
import './customer.css'

export default function Home(){

    // useEffect(function(){
    //     window.location.replace("/customer");
    // },[])
    
    const handleCustomer = () => {
        window.location.replace("/customer");
    }

    const handleHotel = () => {
       window.location.replace("/register")
    }

    return (
        <div style={{ width : "100%",display : "flex",justifyContent:"center",alignItems:"center" }} className="bghome">
        <div style={{ textAlign: "center" ,width : "100%",display : "flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <h2 style={{color: "white"}}>PROJECT: DINE-IN</h2>
           <button className='button' style={{borderRadius:"10px",display:"block",color:"white", padding:" 15px 32px",fontSize:"16px",cursor:"pointer"}} onClick={() => handleCustomer()}>Customer</button>
            <button className='button' style={{borderRadius:"10px",marginTop:"10px",display:"block", padding:" 15px 32px",fontSize:"16px",cursor:"pointer", color: "white", pointer: "cursor", marginBottom: "20px"}} onClick={() => handleHotel()}>Hotel</button>
        </div>
         
        </div>
    )
}