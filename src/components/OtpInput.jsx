import React, { useEffect, useRef, useState } from "react";

function OtpInput({ length = 4, onOtpSubmit = () => {} }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);

  console.log(inputRef);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  function handleChange(e, index) {
    console.log(e.target.value);
    console.log(otp);
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    //only allow one input
    newOtp[index] = value.substring(value.length - 1);

    setOtp(newOtp);

    //submit trigger
    const combinedOtp = newOtp.join("");
    console.log(combinedOtp);
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    //move to next empty field input
    if (value && index < length - 1 && inputRef.current[index]) {
      //if next field is not empty
      if (index < length - 2 && otp[index + 1]) {
        inputRef.current[newOtp.indexOf("")].focus();
      } else inputRef.current[index + 1].focus(); //if next field empty
    }
  }

  function handleClick(index) {
    inputRef.current[index].setSelectionRange(1, 1);
    //move to previous empty if any
    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (
      e.key == "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  }

  return (
    <div>
      {otp.map((value, index) => (
        <input
          className="optinput"
          ref={(input) => (inputRef.current[index] = input)}
          type="text"
          key={index}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}

export default OtpInput;
