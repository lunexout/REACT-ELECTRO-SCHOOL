import React from "react";

export default function ErrorComponent({authentication}) {
  return (
    <>
      <div className="error-notification-div">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          width="20"
          height="20"
          style={{ fill: "#f5483a", marginRight: "8px" }}
          viewBox="0 0 18.499 18.5"
        >
          <defs></defs>
          <g id="noun_Empty_1450836" transform="translate(-181.417 415.584)">
            <path
              id="Path_1138"
              d="M25.667 16.416a9.25 9.25 0 1 0 9.25 9.25 9.26 9.26 0 0 0-9.25-9.25zm7.873 9.25a7.838 7.838 0 0 1-1.84 5.056L20.612 19.637a7.867 7.867 0 0 1 12.928 6.029zm-15.745 0a7.838 7.838 0 0 1 1.843-5.055L30.722 31.7a7.867 7.867 0 0 1-12.928-6.029z"
              class="cls-1"
              data-name="Path 1138"
              transform="translate(165 -432)"
            />
          </g>
        </svg>
        <p className="p__error__notif">დაფიქსირდა შეცდომა!</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          onClick={authentication}
          style={{
            width: "16px",
            height: "16px",
            fill: "#f5483a",
            position: "absolute",
            right: "12px",
            cursor: "pointer",
          }}
          y="0px"
          viewBox="0 0 87.5 87.5"
        >
          <g>
            <g>
              <path d="M12.5,0L0,12.5l31.3,31.3L0,75l12.5,12.5l31.3-31.3L75,87.5L87.5,75L56.3,43.8l31.3-31.3L75,0    L43.8,31.3L12.5,0z" />
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}
