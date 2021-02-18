import React, { useState } from "react";
import "./App.css";
import Login from "./component/loginComponent/Login";
import { useHistory } from 'react-router-dom';

export default function DefaultPage() {
  const history = useHistory();
  
  return (
    <>
      {localStorage.getItem("login") == "logged" ? (
        history.push("/dashboard")
      ) : (
        <div className="_container">
          <div className="container__child">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              width="133"
              height="133"
              className="align__svg"
              viewBox="0 0 133 133"
            >
              <defs>
                <clipPath id="clip-Artboard_4">
                  <rect width="133" height="133" />
                </clipPath>
              </defs>
              <g
                id="Artboard_4"
                data-name="Artboard – 4"
                clip-path="url(#clip-Artboard_4)"
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
                    fill="#4d4fa2"
                  />

                  <path
                    id="Path_589"
                    data-name="Path 589"
                    d="M817.187,600.755s15,26.958-5.09,43.45-79.891,17.205-79.891,17.205,38.43,24.983,85.8,10.2A39.587,39.587,0,0,0,842.7,649.993C848.3,637.147,847.665,618.808,817.187,600.755Z"
                    transform="translate(-725.224 -543.449)"
                    fill="#4d4fa2"
                  />
                  <path
                    id="Path_590"
                    data-name="Path 590"
                    d="M792.938,678.349s-30.842.839-36.174-24.6,21.68-78.794,21.68-78.794-39.92,22.525-48.716,71.367a39.587,39.587,0,0,0,7.751,31.888C746.282,689.112,762.837,697.025,792.938,678.349Z"
                    transform="translate(-729.063 -574.952)"
                    fill="#4d4fa2"
                  />
                </g>
              </g>
            </svg>
            <h1 className="align__center onlineSchool__context">
              ონლაინ სკოლა
            </h1>
            <h2 className="align__center author__context">ავტორიზაცია</h2>
            <Login />
          </div>
          <div className="cont__xoqml">
            <img
              src="https://onlineschool.emis.ge/assets/svg_icons/art-board.svg#Layer_1"
              className="image__component"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}
