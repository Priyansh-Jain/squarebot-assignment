import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "../axios";
import Snackbar from "@material-ui/core/Snackbar";
import SearchIcon from "@material-ui/icons/Search";
import AuthModal from "../Components/Auth/AuthModal";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [message, setMessage] = useState("");
  const [newopen, setNewOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    setNewOpen(false);
  };

  useEffect(() => {
    if (filterValue === "title") {
      axios
        .get(`/jobs/title/${input}`)
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
          setErrorMsg("");
        })
        .catch((error) => {
          console.log("Error", error.message);
          setErrorMsg("Not Found");
        });
    } else if (filterValue === "description") {
      axios
        .get(`/jobs/description/${input}`)
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
          setErrorMsg("");
        })
        .catch((error) => {
          console.log("Error", error.message);
          setErrorMsg("Not Found");
        });
    } else if (filterValue === "recname") {
      axios
        .get(`/jobs/name/${input}`)
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
          setErrorMsg("");
        })
        .catch((error) => {
          console.log("Error", error.message);
          setErrorMsg("Not Found");
        });
    } else if (filterValue === "all") {
      axios
        .get("/jobs")
        .then((response) => {
          console.log(response.data);
          setJobs(response.data);
          setErrorMsg("");
        })
        .catch((error) => {
          console.log("Error", error.message);
        });
    }
  }, [refresh]);

  const applyJob = async (JobId) => {
    if (localStorage.getItem("candidateId")) {
      console.log(JobId);

      const appliedJobData = {
        jobId: JobId,
        candidateId: localStorage.getItem("candidateId"),
      };

      await axios
        .post(`/appliedjobs`, appliedJobData)
        .then((res) => {
          console.log(res);
          setMessage("Successfully Applied");
          setNewOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage("Please Login");
      setNewOpen(true);
    }
  };

  const [isUserLogged, setIsUSerLogged] = useState(false);

  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("all");
  const [input, setInput] = useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const searchFilter = () => {
    console.log("sda");
    setRefresh(!refresh);
  };

  const logout = () => {
    console.log("logout");
    localStorage.clear();
    setIsUSerLogged(false);
  };

  useEffect(() => {
    if (localStorage.getItem("recId") || localStorage.getItem("candidateId")) {
      setIsUSerLogged(true);
    }
  }, [isUserLogged]);

  return (
    <div>
      <HeaderContainer>
        <Link to="/">
          <HeaderLogo>
            <img
              alt="Job Logo"
              src="https://pngimage.net/wp-content/uploads/2018/06/jobs-logo-png-7.png"
            />
          </HeaderLogo>
        </Link>

        <HeaderLinks>
          <JobsLink>
            <Link to="/jobs">Jobs</Link>
          </JobsLink>
        </HeaderLinks>

        <HeaderSearch>
          <label for="jobs"></label>
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            style={{ height: "32px", fontSize: "16px" }}
          >
            <option value="all">All</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="recname">Rec Name</option>
          </select>
          <input
            placeholder="Search Jobs"
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <SearchIcon onClick={searchFilter} />
        </HeaderSearch>

        {isUserLogged ? (
          <LoginButton onClick={logout}>Logout</LoginButton>
        ) : (
          <LoginButton onClick={onOpenModal}>Login/Register</LoginButton>
        )}

        <AuthModal
          open={open}
          onCloseModal={onCloseModal}
          setIsUSerLogged={setIsUSerLogged}
        />
      </HeaderContainer>
      <Container>
        <JobsWrapper>
          {errorMsg === "" ? (
            jobs.map(({ _id, title, description }) => (
              <Row>
                <div>{title}</div>
                <div>{description}</div>
                <ApplyButton onClick={() => applyJob(_id)}>Apply</ApplyButton>
              </Row>
            ))
          ) : (
            <h1 style={{ textAlign: "center" }}>Not Found</h1>
          )}
        </JobsWrapper>

        <Snackbar
          open={newopen}
          autoHideDuration={4000}
          onClose={handleClose}
          message={message}
        ></Snackbar>
      </Container>
    </div>
  );
}

export default Jobs;

const Container = styled.div`
  font-size: 18px;
  align-items: center;
  padding-top: 12px;
`;

const JobsWrapper = styled.div`
  padding-left: 12%;
  padding-right: 12%;
  padding-top: 30px;
  padding-bottom: 30px;
  a {
    color: black;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 5px;
  border: 1px solid lightgray;
  border-right: none;
  border-left: none;
  align-items: center;
  
}
`;

const ApplyButton = styled.button`
  height: 42px;
  width: 14%;
  color: white;
  background-color: #2c3db5;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  :hover {
    box-shadow: 0 1px 9px 0 lightgrey;
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
  height: 80px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding-left: 12%;
  padding-right: 12%;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 43px;
    object-fit: contain;
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  width: 22%;
  justify-content: space-evenly;
  a {
    color: black;
  }
`;

const JobsLink = styled.div`
  a {
    text-decoration: none;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  height: 39px;
  width: 40%;
  box-shadow: 0 1px 5px 0 lightgrey;
  padding-right: 5px;
  margin-left: 1%;
  border-radius: 5px;
  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    padding-left: 10px;
  }
`;

const LoginButton = styled.button`
  margin-left: 8%;
  height: 42px;
  width: 14%;
  color: white;
  background-color: #2c3db5;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
`;
