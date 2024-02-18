import * as React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../global.js";
import { useState } from 'react';

const formValidationSchema = yup.object({
  username: yup
          .string()
          .email()
          .required()
})

export default function Confirmation() {

  const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
    initialValues: { 
        username: ''},

    validationSchema: formValidationSchema,
    onSubmit: (confirmedUser) => { 
          existedUser(confirmedUser)
    }
  });

const navigate = useNavigate();

const [show, setShow] = useState(false);

const styles = {
  display: show ? "block" : "none",
  color: "red"
}

const existedUser = async (confirmedUser) => {

    const data = await fetch(`${API}/users/confirmation`, {
        method: "POST",
        body: JSON.stringify(confirmedUser),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(data.status === 404){
      alert("Please Sign Up")
      // setShow(true)
    }
    else {
      const result = await data.json()
      navigate('/forgotpassword')
    }
    
};

  return (
    <div className="container">
      <div className="loginpage">
        
        <Card className="card-container">

          <div className="headtext">
            <h4>Confirm your Email</h4>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="textbox">
            <TextField 
                name="username" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                label="Email" 
                variant="standard"
                error={errors.username && touched.username}
                helperText={errors.username && touched.username ? errors.username: null}
                />
            </div>

            {/* {show ? <lable style={styles} className="password-matching">Please Sign Up</lable> : null} */}

            <div className="loginButton">
              <Button
                type="submit"
                className="submit-button"
                variant="contained" 
                style={{ backgroundColor: '#561C24' }}
              >
                Send OTP
              </Button>
            </div>
     
          </form>
        </Card>

      </div>
    </div>
  );
}


