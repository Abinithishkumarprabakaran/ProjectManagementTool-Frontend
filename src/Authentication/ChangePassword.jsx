import * as React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../global.js";
import { useState } from 'react';

const formValidationSchema = yup.object({
  password: yup
          .string()
          .required()
          .min(8),
  confirmPassword: yup
          .string()
          .required()
          .min(8)
})

export default function ChangePassword() {

  const {id} = useParams();

  const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
    initialValues: { 
      password: '', 
      confirmPassword: ''},

    validationSchema: formValidationSchema,
    onSubmit: (updatedPassword) => { 
          updatePassword(updatedPassword)
    }
  });

const navigate = useNavigate();

const [show, setShow] = useState(false);

const styles = {
  display: show ? "block" : "none",
  color: "red"
}

const updatePassword = async (updatedPassword) => {

    const data = await fetch(`${API}/users/changepassword/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedPassword),
        headers: {
            "Content-Type": "application/json",
        },
    });

    localStorage.clear()
    navigate("/")
};

  return (
    <div className="container">
      <div className="loginpage">
        
        <Card className="card-container">

          <div className="headtext">
            <h4>Change Password</h4>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="textbox">
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
                name="confirmPassword" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                label="Confirm Password" 
                variant="standard"
                error={errors.confirmPassword && touched.confirmPassword}
                helperText={errors.confirmPassword && touched.confirmPassword ? errors.password: null}
                />
            </div>

            <div className="loginButton">
              <Button
                type="submit"
                className="submit-button"
                variant="contained" 
                >
                  Confirm
              </Button>
            </div>
     
          </form>
        </Card>

      </div>
    </div>
  );
}


