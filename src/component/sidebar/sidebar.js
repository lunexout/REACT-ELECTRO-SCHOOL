import React from "react";
import "./sidebar.css";


export default function Sidebar({ homeComponent, homeClassComponent, homeComponentParagraph, homeComponentSVG, subjectComponent, subjectClassComponent, subjectComponentSVG, subjectComponentParagraph, homeWorkComponent, homeWorkClassComponent, homeWorkSVGComponent, homeWorkParagraphComponent }) {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li className={homeClassComponent} onClick={homeComponent}>
            <div className="_prev-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                style={{ width: "18px", height: "18px", fill: "#fff" }}
                x="0px"
                className={homeComponentSVG}
                y="0px"
                viewBox="0 0 80 80"
              >
                <path d="M75,80H65c-2.8,0-5-2.2-5-5V65c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10C80,77.8,77.8,80,75,80z M76,68c0-4-4-4-4-4h-4  c0,0-4,0-4,4v4c0,4,4,4,4,4h4c0,0,4,0,4-4V68z M75,50H65c-2.8,0-5-2.2-5-5V35c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10  C80,47.8,77.8,50,75,50z M76,38c0-4-4-4-4-4h-4c0,0-4,0-4,4v4c0,4,4,4,4,4h4c0,0,4,0,4-4V38z M75,20H65c-2.8,0-5-2.2-5-5V5  c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10C80,17.8,77.8,20,75,20z M76,8c0-4-4-4-4-4h-4c0,0-4,0-4,4v4c0,4,4,4,4,4h4c0,0,4,0,4-4V8z   M45,80H35c-2.8,0-5-2.2-5-5V65c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10C50,77.8,47.8,80,45,80z M46,68c0-4-4-4-4-4h-4c0,0-4,0-4,4v4  c0,4,4,4,4,4h4c0,0,4,0,4-4V68z M45,50H35c-2.8,0-5-2.2-5-5V35c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10C50,47.8,47.8,50,45,50z   M46,38c0-4-4-4-4-4h-4c0,0-4,0-4,4v4c0,4,4,4,4,4h4c0,0,4,0,4-4V38z M45,20H35c-2.8,0-5-2.2-5-5V5c0-2.8,2.2-5,5-5h10  c2.8,0,5,2.2,5,5v10C50,17.8,47.8,20,45,20z M46,8c0-4-4-4-4-4h-4c0,0-4,0-4,4v4c0,4,4,4,4,4h4c0,0,4,0,4-4V8z M15,80H5  c-2.8,0-5-2.2-5-5V65c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10C20,77.8,17.8,80,15,80z M16,68c0-4-4-4-4-4H8c0,0-4,0-4,4v4  c0,4,4,4,4,4h4c0,0,4,0,4-4V68z M15,50H5c-2.8,0-5-2.2-5-5V35c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10C20,47.8,17.8,50,15,50z M16,38  c0-4-4-4-4-4H8c0,0-4,0-4,4v4c0,4,4,4,4,4h4c0,0,4,0,4-4V38z M15,20H5c-2.8,0-5-2.2-5-5V5c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10  C20,17.8,17.8,20,15,20z M16,8c0-4-4-4-4-4H8c0,0-4,0-4,4v4c0,4,4,4,4,4h4c0,0,4,0,4-4V8z"></path>
              </svg>
              <p className={homeComponentParagraph}>მთავარი</p>
            </div>
          </li>
          <li className={subjectClassComponent} onClick={subjectComponent}>
            <div className="_prev-flex active-cross">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                width="18"
                style={{ fill: "white" }}
                className={subjectComponentSVG}
                height="18"
                viewBox="0 0 21.75 21.75"
              >
                <defs></defs>
                <path
                  id="Rectangle_1642"
                  d="M0 0h10.634v1.745H0z"
                  className="cls-1"
                  data-name="Rectangle 1642"
                  transform="translate(5.558)"
                />
                <path
                  id="Rectangle_1643"
                  d="M0 0h15.797v1.745H0z"
                  className="cls-1"
                  data-name="Rectangle 1643"
                  transform="translate(2.975 3.49)"
                />
                <path
                  id="Path_1126"
                  d="M0 8.022v14.771h21.75V8.022zm20.01 13.031H1.74V9.762h18.27z"
                  className="cls-1"
                  data-name="Path 1126"
                  transform="translate(0 -1.043)"
                />
              </svg>
              <p className={subjectComponentParagraph}>
                {localStorage.getItem("type") === "teacher"
                  ? "კლასები"
                  : "საგნები"}
              </p>
            </div>
          </li>
          <li className={homeWorkClassComponent} onClick={homeWorkComponent}>
            <div className="_prev-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                x="0px"
                style={{ fill: "#fff", width: "18px", height: "18px" }}
                y="0px"
                className={homeWorkSVGComponent}
                viewBox="0 0 210.4 145.9"
              >
                <g>
                  <rect y="49.8" className="st0" width="166.8" height="27.9" />
                  <polygon
                    className="st0"
                    points="154.5,106.5 134.5,86.4 114.8,106.2 154.5,145.9 210.4,90.1 190.7,70.4  "
                  />
                  <rect className="st0" width="166.8" height="27.9" />
                  <rect y="95.5" className="st0" width="85.5" height="27.9" />
                </g>
              </svg>
              <p className={homeWorkParagraphComponent}>დავალებები</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}