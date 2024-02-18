import * as React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../global.js"
import { useState } from "react";

const formValidationSchema = yup.object({
  username: yup
          .string()
          .email()
          .required(),
  password: yup
          .string()
          .required()
          .min(8),
  confirmpassword: yup
          .string()
          .required()
          .min(8)
})

export default function Signup() {

  const [show, setShow] = useState(false)

  const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
    initialValues: { 
        username: '', 
        password: '',
        confirmpassword: ''},

    validationSchema: formValidationSchema,
    onSubmit: (newUser) => { 
        if(newUser.password === newUser.confirmpassword){
          setShow(show)
          addUser(newUser)
        }
        else {
          setShow(!show)
        }
        
    }
  });

const navigate = useNavigate();

const addUser = async (newUser) => {

    await fetch(`${API}/users/signup`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json",
        },
    });

    navigate("/")
};

  return (
    <div className="container">
      <div className="loginpage">
        
        <Card className="card-container">

          <div className="headtext">
            <h4>Hello</h4>
            <span>Sign Up</span>
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
              <TextField 
                name="password" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                label="Password" 
                variant="standard"
                error={errors.password && touched.password}
                helperText={errors.password && touched.password ? errors.password: null}
                />
              <TextField 
                name="confirmpassword" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmpassword}
                label="Confirm Password"
                variant="standard"
                error={errors.confirmpassword && touched.confirmpassword}
                helperText={errors.confirmpassword && touched.confirmpassword ? errors.confirmpassword: null}
                />
            </div>
            {show ? <lable className="password-matching">Password doesn't match</lable> : null}
            <div className="loginButton">
              <Button
                type="submit"
                variant="contained" 
                style={{ backgroundColor: '#561C24' }}
              >
                Sign up
              </Button> 
            </div>
     
          </form>
        </Card>

      </div>
    </div>
  );
}
