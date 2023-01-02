import React,{useState,useRef} from 'react'
import "./verify.css"
import OTPInput from "react-otp-input";
import Toastify from 'toastify-js'
import Countdown from 'react-countdown';

export default function Verify() {
    const [OTP, setOTP] = useState("");
    const [date,setDate] = useState(Date.now() + 300000);
    const clockRef = useRef();


    function handleChange(OTP) {
      setOTP(OTP);
    }
    const id = sessionStorage.getItem("id");

    function Submit(){
    fetch(`http://darkevo24.pythonanywhere.com/check-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({otp : OTP})
    }).then(res => res.json()).then(res => {
      if (res.data === "success"){
          window.location.replace("/pay/" + id)
      }
      else {
        Toastify({
          text: "OTP number is wrong",
          duration: 3000,
          newWindow: true,
          close: false,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to top, white, orange)",
          },
          onClick: function(){} // Callback after click
        }).showToast();
      }
    });
    }

    function Resend(){
      fetch(`http://darkevo24.pythonanywhere.com/resend`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id : id})
      }).then(res => res.json()).then(res => console.log(res)).catch(error => console.log(error));
      setDate(Date.now() + 300000)  
      clockRef.current.start()
    }

    function Renderer({ hours, minutes, seconds, completed }){
      if (completed){
        return(
          <div>
            <p style={{ marginTop : 10 }} className="p3">Didn't receive the code?</p>
            <p onClick={Resend} style={{ cursor : "pointer" }} className="resend">Resend</p> 
          </div>
        ) 
      }
      return <span style={{ textDecoration: "underline" }}>Time Remaining {minutes} : {seconds} </span>
    }
  return (
    <div>
    <div className="verifyDiv">
        <p className="p1">Verify Account</p>
        {/* <p className="p2">
            An OTP has been sent to your entered email abcd@gmail.com
        </p> */}
        <div className="otpElements">
            <p className="p3">Enter your Code here</p>
            <div className="otp">
            <OTPInput
                onChange={handleChange}
                value={OTP}
                inputStyle="inputStyle"
                numInputs={6}
                // separator={<span></span>}
                isInputNum="true"
            />
            </div>
            <p style={{ marginTop : 10 }}><Countdown date={date} ref={clockRef} renderer={Renderer} /></p>
        </div>
        <button onClick={Submit} type="submit">Verify</button>
        </div>
    </div>
  )
}
