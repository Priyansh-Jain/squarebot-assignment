import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import axios from "../../axios";

function Signup({ setlogin, setIsUSerLogged, onClose, onAuth }) {
  const [error, setError] = useState("");
  const validationSchema = yup.object({
    name: yup.string("Enter your name").required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let config = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "candidate",
      };

      axios
        .post("auth/register", config)
        .then((response) => {
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("candidateId", response.data.id);

          setIsUSerLogged((prev) => !prev);
          onClose((prev) => !prev);
        })
        .catch((error) => {
          console.log("Error", error);
          setError("Invalid Credentials");
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    },
  });
  return (
    <SignupContainer>
      <SignupHeader>Welcome to Jobs</SignupHeader>
      <InputContainer>
        <form onSubmit={formik.handleSubmit} autocomplete="off">
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Your Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Enter Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </InputContainer>

      <LoginLinkContainer>
        Already have an account?{" "}
        <LoginLink onClick={() => setlogin((prev) => !prev)}>Login</LoginLink>
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      </LoginLinkContainer>
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 475px;
`;

const SignupHeader = styled.h1`
  margin-top: 22px;
  margin-bottom: 23px;
  letter-spacing: 0.3px;
  font-size: 36px;
  font-weight: 600;
  color: #44475b;
`;

const InputContainer = styled.div`
  width: 80%;
`;

const LoginLink = styled.span`
  cursor: pointer;
  font-weight: 800;
  :hover {
    color: #2c3db5;
    text-decoration: underline;
  }
`;

const LoginLinkContainer = styled.div`
  margin-top: 3px;
`;
