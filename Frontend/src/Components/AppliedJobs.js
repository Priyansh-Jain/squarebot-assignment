import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "../axios";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setrefresh] = useState(true);
  const [appJobs, setAppJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [authenticate, setAuthenticate] = useState(true);
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [newopen, setNewOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const handleClose = () => setNewOpen(false);

  const signupValidationSchema = yup.object({
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

  const loginValidationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const signupFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      let config = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "recruiter",
      };
      axios
        .post("/auth/register", config)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("recId", res.data.id);
          setAuthenticate((prev) => !prev);

          values.name = "";
          values.email = "";
          values.password = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      let config = {
        email: values.email,
        password: values.password,
      };
      axios
        .post("/auth/login", config)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("recId", res.data.id);
          setAuthenticate((prev) => !prev);
          setrefresh(!refresh);

          values.email = "";
          values.password = "";
        })
        .catch((err) => {
          console.log(err);
          setMessage("INVALID CREDENTIALS");
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
    },
  });

  useEffect(() => {
    const RecruiterId = localStorage.getItem("recId");

    axios
      .get(`/appliedjobs/${RecruiterId}`)
      .then((res) => setAppJobs(res.data))
      .catch((error) => console.log(error));
  }, [refresh]);

  const postJob = () => {
    let config = {
      title: title,
      description: description,
      recruiterId: localStorage.getItem("recId"),
    };

    axios
      .post(`/jobs`, config)
      .then((res) => {
        onCloseModal();
        setNewOpen(true);
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    setAuthenticate(true);
    localStorage.removeItem("recId");
  };

  const addJob = () => {
    onOpenModal();
  };

  useEffect(() => {
    if (localStorage.getItem("recId")) {
      setAuthenticate(false);
    }
  }, [authenticate]);

  return (
    <Container>
      {!authenticate ? (
        <Container>
          <Header>
            <Heading>APPLIED JOBS</Heading>
            <LogOutButton onClick={logout}>LOG OUT</LogOutButton>
          </Header>
          <Orders>
            {appJobs.map(({ jobName, jobDescription, candidateName }) => (
              <Row>
                <div>{jobName}</div>
                <div>{jobDescription}</div>
                <div>{candidateName}</div>
              </Row>
            ))}
          </Orders>
          <AddJobButton onClick={addJob}>POST JOB</AddJobButton>
        </Container>
      ) : (
        [
          login ? (
            <SignupContainer>
              <SignupHeader>RECRUITER &nbsp;LOGIN</SignupHeader>
              <InputContainer>
                <form onSubmit={loginFormik.handleSubmit} autocomplete="off">
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Your Email Address"
                    value={loginFormik.values.email}
                    onChange={loginFormik.handleChange}
                    error={
                      loginFormik.touched.email &&
                      Boolean(loginFormik.errors.email)
                    }
                    helperText={
                      loginFormik.touched.email && loginFormik.errors.email
                    }
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Enter Password"
                    type="password"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    error={
                      loginFormik.touched.password &&
                      Boolean(loginFormik.errors.password)
                    }
                    helperText={
                      loginFormik.touched.password &&
                      loginFormik.errors.password
                    }
                  />
                  <div style={{ marginTop: "30px" }}></div>

                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                  <p style={{ color: "red", marginTop: "10px" }}>{message}</p>
                </form>
              </InputContainer>
              <SignupLinkContainer>
                New here? Click here to{" "}
                <SignupLink onClick={() => setLogin((prev) => !prev)}>
                  create an account
                </SignupLink>
              </SignupLinkContainer>
            </SignupContainer>
          ) : (
            <SignupContainer>
              <SignupHeader>RECRUITER &nbsp;SIGNUP</SignupHeader>
              <InputContainer>
                <form onSubmit={signupFormik.handleSubmit} autocomplete="off">
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Your Name"
                    value={signupFormik.values.name}
                    onChange={signupFormik.handleChange}
                    error={
                      signupFormik.touched.name &&
                      Boolean(signupFormik.errors.name)
                    }
                    helperText={
                      signupFormik.touched.name && signupFormik.errors.name
                    }
                  />
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Your Email Address"
                    value={signupFormik.values.email}
                    onChange={signupFormik.handleChange}
                    error={
                      signupFormik.touched.email &&
                      Boolean(signupFormik.errors.email)
                    }
                    helperText={
                      signupFormik.touched.email && signupFormik.errors.email
                    }
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Enter Password"
                    type="password"
                    value={signupFormik.values.password}
                    onChange={signupFormik.handleChange}
                    error={
                      signupFormik.touched.password &&
                      Boolean(signupFormik.errors.password)
                    }
                    helperText={
                      signupFormik.touched.password &&
                      signupFormik.errors.password
                    }
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                  <p style={{ color: "red", marginTop: "10px" }}>{message}</p>
                </form>
              </InputContainer>
              <SignupLinkContainer>
                Already have an account?{" "}
                <SignupLink onClick={() => setLogin((prev) => !prev)}>
                  Login
                </SignupLink>
              </SignupLinkContainer>
            </SignupContainer>
          ),
        ]
      )}

      <Modal open={open} onClose={onCloseModal} center>
        <ModalContainer>
          <ModalHeading>POST JOB </ModalHeading>

          <input
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <SubmitButton onClick={postJob}>Submit</SubmitButton>
        </ModalContainer>
      </Modal>

      <Snackbar
        open={newopen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={"Successfully Posted"}
      ></Snackbar>
    </Container>
  );
}

export default Admin;

const Container = styled.div`
  font-size: 18px;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 35px;
`;

const Heading = styled.h1`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
`;

const Orders = styled.div`
  padding-left: 12%;
  padding-right: 12%;
  padding-top: 20px;
  padding-bottom: 30px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid lightgray;
  :hover{
    box-shadow: 0 1px 9px 0 lightgrey;
    cursor:pointer;
  }
}
`;

const SignupContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 530px;
  margin: 9% auto;
  box-shadow: 0 1px 5px 0 lightgrey;
  border-radius: 6px;
`;

const SignupHeader = styled.h1`
  margin-top: 44px;
  margin-bottom: 46px;
  letter-spacing: 0.3px;
  font-size: 36px;
  font-weight: 600;
  color: #44475b;
`;

const InputContainer = styled.div`
  width: 80%;
`;

const ModalContainer = styled.div`
  width: 500px;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  input {
    width: 80%;
    margin-bottom: 15px;
    padding: 9px 13px;
    border: 1px solid #7f7777;
    border-radius: 5px;
    outline-color: #2c3db5;
    font-size: 17px;
  }
  div{
      width:80%;
      border: 1px solid #7f7777 !important;
      outline-color: #2c3db5;
      div{
          width:auto;
          border:none !important;
          outline:none;
      }
  }
  }
`;

const ModalHeading = styled.h1`
  margin-top: 31px;
  margin-bottom: 22px;
  font-size: 32px;
`;

const SubmitButton = styled.button`
  height: 42px;
  width: 80%;
  color: white;
  background-color: #2c3db5;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  margin-top: 20px;
`;

const LogOutButton = styled.button`
  height: 42px;
  width: 10%;
  color: white;
  background-color: #2c3db5;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  margin-top: 20px;
  position: absolute;
  right: 120px;
  top: 19px;
`;

const AddJobButton = styled.button`
  height: 44px;
  width: 22%;
  color: white;
  background-color: #2c3db5;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  margin: 18px 39%;
`;

const Header = styled.div``;

const SignupLink = styled.span`
  cursor: pointer;
  font-weight: 800;
  :hover {
    color: #2c3db5;
    text-decoration: underline;
  }
`;

const SignupLinkContainer = styled.div`
  margin-top: 9px;
`;
