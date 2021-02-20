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
              localStorage.removeItem("todaysDate")

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
            className="fas fa-bars none asdpqo"
            onClick={() => {
              setShowBurgerMenuItem(true);
            }}
          ></i>
          <img
            src="https://cyso.ge/domainlogo.png"
            alt=""
            className="_svg-cqoxn qolxlpqo"
          />

          <p className="qolxlpqo">ციფრული ჟურნალი</p>
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
              src={user.image}
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
