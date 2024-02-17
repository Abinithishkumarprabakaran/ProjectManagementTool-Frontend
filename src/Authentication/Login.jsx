import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { REG_API } from "../global.js";
import { useState } from 'react';

const formValidationSchema = yup.object({
  username: yup
          .string()
          .email()
          .required(),
  password: yup
          .string()
          .required()
          .min(8)
})

export default function Login() {

  // localStorage.clear()
  // window.location.href ='/'

  const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
    initialValues: { 
        username: '', 
        password: ''},

    validationSchema: formValidationSchema,
    onSubmit: (loginUser) => { 
          console.log("login Button")
          existedUser(loginUser)
    }
  });

const navigate = useNavigate();

const [show, setShow] = useState(false);

const styles = {
  display: show ? "block" : "none",
  color: "red"
}

const existedUser = async (loginUser) => {

    const data = await fetch(`${REG_API}/login`, {
        method: "POST",
        body: JSON.stringify(loginUser),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(data.status === 401){
      // console.log("Error")
      alert("Please Sign up")
      setShow(true)
    }
    else {
      const result = await data.json()
      console.log("success", result)
      localStorage.setItem('token', result.token)
      navigate(`/${result.userId}/projects`)
    }
};
  return (
    <div className="container">
      <div className="loginpage">
        <Card className="card-container" elevation={10}>
          <div className="headtext">
            <h4>Hello Again!</h4>
            <span>Login</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="textbox">
            <TextField 
                name="username" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                label="Email" 
                variant="outlined"
                error={errors.username && touched.username}
                helperText={errors.username && touched.username ? errors.username: null}
                />
              <TextField 
                name="password" 
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                label="Password" 
                variant="outlined"
                error={errors.password && touched.password}
                helperText={errors.password && touched.password ? errors.password: null}
                />
            </div>

            {show ? <lable style={styles} className="password-matching">Invalid Credentials</lable> : null}

            <div className="loginButton">
              <Button 
                type="submit"
                variant="contained" 
                style={{ backgroundColor: 'green' }}
              >
                Login
              </Button> 
              <Link className="fp" href="/confirmation"> <span>Forgot Password?</span> </Link>
              <span>Not a Member <Link href='/signup'>Sign up</Link></span>
            </div>
     
          </form>

        </Card>


      </div>
    </div>
  );
}