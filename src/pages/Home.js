import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { BsGraphUp } from "react-icons/bs";
import { RiUserSettingsFill } from "react-icons/ri";
import { MdOutlineRequestQuote } from "react-icons/md";
import { AiTwotoneContainer } from "react-icons/ai";
import { AiFillCreditCard } from "react-icons/ai";

function Home() {
  return (
    <>
      <Header user={false} />
      <div className="card-container">
        <Link to="/Analysis" style={{ textDecoration: "none", color: "black" }}>
          <div className="dashboard-card">
            <div className="card-item">
              <AiFillCreditCard size={60} color="#283E81" />
              <span className="dashboard-link" style={{ textAlign: "center" }}>
                Analysis
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
