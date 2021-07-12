import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import AuthModal from "../Auth/AuthModal";
import "react-responsive-modal/styles.css";
import axios from "../../axios";

function Header() {
  const [isUserLogged, setIsUSerLogged] = useState(false);

  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("all");
  const [input, setInput] = useState("");
  const [jobData, setJobData] = useState([]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const searchFilter = () => {
    console.log(filterValue);
    console.log(input);

    if (filterValue === "title") {
      axios
        .get(`/jobs/title/${input}`)
        .then((response) => {
          console.log(response.data);
          setJobData(response.data);
        })
        .catch((error) => {
          console.log("Error", error.message);
        });
    } else if (filterValue === "description") {
      axios
        .get(`/jobs/description/${input}`)
        .then((response) => {
          console.log(response.data);
          setJobData(response.data);
        })
        .catch((error) => {
          console.log("Error", error.message);
        });
    } else if (filterValue === "recname") {
      axios
        .get(`/jobs/name/${input}`)
        .then((response) => {
          console.log(response.data);
          setJobData(response.data);
        })
        .catch((error) => {
          console.log("Error", error.message);
        });
    }
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
        <Jobs>
          <Link to="/jobs">Jobs</Link>
        </Jobs>
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
  );
}

export default Header;

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

const Jobs = styled.div`
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
