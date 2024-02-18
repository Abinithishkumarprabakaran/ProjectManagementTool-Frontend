import * as React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../global.js";
import { useNavigate } from "react-router-dom";
import { Timer, Time, TimerOptions } from 'timer-node';

const formValidationSchema = yup.object({
      OTP: yup
          .number()
          .required()
})

export default function ForgotPassword() {

  const navigate = useNavigate();

  const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
    initialValues: { 
        OTP: ''},

    validationSchema: formValidationSchema,
    onSubmit: (OTPVerify) => { 
        // console.log(OTPVerify)
          OTPVerification(OTPVerify)
    }
  });

  const OTPVerification = async (OTPVerify) => {

    const data = await fetch(`${API}/forgotpassword`, {
        method: "POST",
        body: JSON.stringify(OTPVerify),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(data.status === 401){
      // console.log("Invalid OTP")
      alert("Invalid OTP")
    }
    else {
      const result = await data.json()
      // console.log("success", result)
      localStorage.setItem('OTP', result.OTP)
      navigate(`/changepassword/${result.userID}`)
    }
};

  return (
    <div className="container">
      <div className="loginpage">
        
        <Card className="card-container">

          <div className="headtext">
            <h4>Recovery</h4>
            <span>Enter OTP to recover Password</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="textbox">
              <TextField 
                name="OTP" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.OTP}
                label="OTP" 
                variant="outlined"
                error={errors.OTP && touched.OTP}
                helperText={errors.OTP && touched.OTP ? errors.OTP: null}
                />
            </div>

            <div className="loginButton">
              <Button
                type="submit"
                className="submit-button"
                variant="contained" 
                style={{ backgroundColor: '#561C24' }}
                >
                  Submit
              </Button> 
              <span>Can't get OTP ? <Link className="cp" href="/"> Resend </Link></span>
            </div>
     
          </form>
        </Card>

      </div>
    </div>
  );
}

