import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Home() {
  return (
    <div>
      <Header />
      <Container>
        <Col>
          <h2>
            Trusted by Millions of Indians. Find Jobs <br /> today.
          </h2>
          <Link to="/jobs">
            <SubmitButton>Get Started</SubmitButton>
          </Link>
        </Col>
        <ColContainer>
          <ColWrapper>
            <Card>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFSWRVbzcd2dX8vwMZ-LM-zCikK0qYIqDP6YGkgyIccmu9jjkshZqF0DUMUPaP80EUa2E&usqp=CAU"
                alt={"funds"}
              />
            </Card>
            <Card>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Qz8A3mScllAcmj4R0hwPMIC9oV3IiQX690vnQoJtRWZjGtQ1vbg-viv_eU4y5oycgw&usqp=CAU"
                alt={"future & options"}
              />
            </Card>
            <Card>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRYh7qOnP-KdaC3l1r_-ccqOxRez1vea2BjQ&usqp=CAU"
                alt={"gold"}
              />
            </Card>
          </ColWrapper>
          <ColWrapper>
            <Card>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBo4ldPr5hwM9ddjfXxoiKgJQbBqNKAoZzg&usqp=CAU"
                alt={"stocks"}
              />
            </Card>
            <Card>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYNeqsIPPgJ270U8wR3zD_6_Y5ry4mJSe9uA&usqp=CAU"
                alt={"USstocks"}
              />
            </Card>
            <Card>
              <img
                src="https://ipubuzz.com/wp-content/uploads/2021/03/google2.0.0.jpg"
                alt={"FD"}
              />
            </Card>
          </ColWrapper>
        </ColContainer>
      </Container>
    </div>
  );
}

export default Home;

const Container = styled.div`
  margin-left: 12%;
  margin-bottom: 50px;
  margin-top: 50px;
  margin-right: 12%;
  display: flex;
  height: 77vh;
`;

const Col = styled.div`
  width: 50%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: start;
  text-align: start;
`;

const ColContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  text-align: start;
`;

const SubmitButton = styled.button`
  height: 54px;
  width: 180%;
  color: white;
  background-color: #2c3db5;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  margin-top: 21px;
`;

const Card = styled.div`
  width: 200px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 15px;
  padding-top: 15px;
  border-radius: 20px;
  margin-right: 15px;
  box-shadow: 3px 6px 24px rgb(0 0 0 / 12%);
  align-items: center;
  margin-bottom: 20%;
  img {
    width: 131px;
    height: 100px;
    object-fit: contain;
  }
`;

const ColWrapper = styled.div``;
