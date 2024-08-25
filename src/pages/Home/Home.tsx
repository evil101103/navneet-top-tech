import React from "react";
import { Outlet } from "react-router";
import Logo from "../../assets/logo.png";
import Exam from "../../assets/exam.png";
import Book from "../../assets/book.png";
import Stats from "../../assets/stats.png";
import Fee from "../../assets/fee.png";
import Notify from "../../assets/notification.png";
import Announce from "../../assets/announcement.png";
import Profile from "../../assets/profile.png";
import Search from "../../assets/search.png";

import "./Home.css";
import { Link } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="side_bar">
        <Link to="/home">
          <img src={Logo} alt="logo"></img>
        </Link>
        <Link className="side_bar_icon" to="">
          <img src={Exam} alt="exam"></img>
        </Link>
        <Link className="side_bar_icon" to="">
          <img src={Book} alt="exam"></img>
        </Link>
        <Link className="side_bar_icon" to="">
          <img src={Stats} alt="exam"></img>
        </Link>
        <Link className="side_bar_icon" to="">
          <img src={Fee} alt="exam"></img>
        </Link>
        <hr></hr>
        <Link className="side_bar_icon" to="">
          <img src={Notify} alt="exam"></img>
        </Link>
        <Link className="side_bar_icon" to="">
          <img src={Announce} alt="exam"></img>
        </Link>
        <Link className="side_bar_icon" to="">
          <img src={Profile} alt="exam"></img>
        </Link>
      </div>
      <div className="view__tasks">
        <div className="navbar">
          <div style={{ display: "flex" }}>
            <button>
              <IoReorderThreeSharp className="navbar_icon" />
            </button>
            <div>
              <h3>Hello, MarinaMSB Mendes!</h3>
              <span>Shruti Sawarkar Institute</span>
            </div>
          </div>
          <div>
            <button>
              <img src={Search} alt="search" />
            </button>
            <button>
              <img src={Notify} alt="notification" />
            </button>
            <button>
              <img src={Profile} alt="profile" />
            </button>
          </div>
        </div>
        <div className="scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
