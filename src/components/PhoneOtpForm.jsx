import React, { useState } from "react";
import OtpInput from "./OtpInput";

function PhoneOtpForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setshowOtpInput] = useState(false)

  function handlePhoneNumber(e) {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  }

  function handlePhoneSubmit(e) {
    e.preventDefault();

    //phone validation
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("invalid phone number!!!");
      return
    }

    //call api
    //show otp field

    setshowOtpInput(true)
  }

  function onOtpSubmit(combinedOtp){
    console.log('success')
  }

  return (
    <div>
      {!showOtpInput? <form action="" onSubmit={handlePhoneSubmit}>
        <input
          type="text"
          value={phoneNumber}
          placeholder="Enter your phone number"
          onChange={handlePhoneNumber}
        />
        <button type="submit">Submit</button>
      </form> : (
        <div>
            <p>Enter OTP sent to {phoneNumber}</p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
}

export default PhoneOtpForm;
