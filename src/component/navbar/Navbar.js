import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ResponsiveSidebar from "../sidebar/responsiveSidebar";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownClose, setDropdownClose] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const history = useHistory();
  const dropdownUser = () => {
    setShowDropdown(!showDropdown);
    setDropdownClose(!dropdownClose);
  };
  const [showBurgerMenuItem, setShowBurgerMenuItem] = useState(false);

  const DropDownContent = () => {
    return (
      <>
        <ul className="ul-item">
          <li className="li-item">
            <i className="fas fa-user-circle i_tag"></i>
            <span className="span-item">პირადი ინფორმაცია</span>
          </li>
          <li
            className="li-item"
            onClick={() => {
              history.push("/change=password");
            }}
          >
            <i className="fas fa-lock i_tag"></i>
            <span className="span-item">პაროლის ცვლილება</span>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem("login");
              localStorage.removeItem("user");
              localStorage.removeItem("ID");
              localStorage.removeItem("type");

              history.push("/");
            }}
            className="li-item"
          >
            <i className="fas fa-sign-out-alt i_tag"></i>
            <span className="span-item">სისტემიდან გასვლა</span>
          </li>
        </ul>
      </>
    );
  };
  return (
    <>
      {showBurgerMenuItem && (
        <ResponsiveSidebar auth={() => setShowBurgerMenuItem(false)} />
      )}
      {dropdownClose && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "90vh",
          }}
          onClick={() => dropdownUser()}
        ></div>
      )}
      <div className="navbar__container">
        <div className="navbarLeft__content">
          <i
            class="fas fa-bars none asdpqo"
            onClick={() => {
              setShowBurgerMenuItem(true);
            }}
          ></i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="133"
            height="133"
            viewBox="0 0 133 133"
            className="_svg-cqoxn qolxlpqo"
          >
            <defs>
              <clipPath id="clip-Artboard_4">
                <rect width="133" height="133" />
              </clipPath>
            </defs>
            <g
              id="Artboard_4"
              data-name="Artboard – 4"
              clipPath="url(#clip-Artboard_4)"
            >
              <g
                id="Group_529"
                data-name="Group 529"
                transform="translate(-0.468 0.396)"
              >
                <path
                  id="Path_588"
                  data-name="Path 588"
                  d="M745.188,628.2s14.07-27.46,38.948-19.924,58.712,56.844,58.712,56.844-.595-45.833-39.219-76.995a39.582,39.582,0,0,0-31.7-8.506C758.143,582.106,743.254,592.829,745.188,628.2Z"
                  transform="translate(-709.581 -569.967)"
                  fill="#5e94fa"
                />
                <path
                  id="Path_589"
                  data-name="Path 589"
                  d="M817.187,600.755s15,26.958-5.09,43.45-79.891,17.205-79.891,17.205,38.43,24.983,85.8,10.2A39.587,39.587,0,0,0,842.7,649.993C848.3,637.147,847.665,618.808,817.187,600.755Z"
                  transform="translate(-725.224 -543.449)"
                  fill="#5e94fa"
                />
                <path
                  id="Path_590"
                  data-name="Path 590"
                  d="M792.938,678.349s-30.842.839-36.174-24.6,21.68-78.794,21.68-78.794-39.92,22.525-48.716,71.367a39.587,39.587,0,0,0,7.751,31.888C746.282,689.112,762.837,697.025,792.938,678.349Z"
                  transform="translate(-729.063 -574.952)"
                  fill="#5e94fa"
                />
              </g>
            </g>
          </svg>
          <p className="qolxlpqo">ონლაინ სკოლა</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p className="paragraph__context fnt">{user.role}</p>
            <p className="paragraph__context">
              <span className="_mleft">{user.name}</span>
              <span>{user.surname}</span>
            </p>
          </div>{" "}
          <div style={{ position: "relative" }}>
            <img
              src="https://onlineschool.emis.ge/assets/images/pattern.png"
              alt=""
              className="_image-property"
              onClick={() => dropdownUser()}
            />
            {showDropdown && (
              <>
                <DropDownContent />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
