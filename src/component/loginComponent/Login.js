import React, { useState, useRef } from "react";
import TeacherLoginComponent from "./teacherLoginComponent/teacherLoginComponent";
import db from "../connectFirebase/firebase";
import { useHistory } from "react-router-dom";
import ErrorComponent from "./errorComponent";

export default function Login() {
  const [personalNumber, setPersonalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showTeacherContext, setShowTeacherContext] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordLoginError, setPasswordLoginError] = useState(false);
  const [authenticationError, setAuthenticationError] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const loginErrorRef = useRef();
  const passwordErrorRef = useRef();
  const history = useHistory();
  const renderTeacherContext = () => {
    setShowTeacherContext(!showTeacherContext);
  };

  const loginAuthentication = async () => {
    if (!personalNumber) {
      setLoginError(true);
      setPasswordLoginError(false);
      loginErrorRef.current.focus();
    } else if (!password) {
      setLoginError(false);
      setPasswordLoginError(true);
      passwordErrorRef.current.focus();
    } else {
      if (personalNumber.length > 1) {
        setPasswordLoginError(false);
        setLoginError(false);
        setSpinner(true);
        return await db.collection("Students").onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((data) => {
            if (
              data.data().password === password &&
              data.data().ID === personalNumber
            ) {
              setAuthenticationError(false);
              localStorage.setItem("login", "logged");
              localStorage.setItem("type", "student");
              localStorage.setItem("ID", personalNumber);
              const user = data.data();
              user.password = null;
              localStorage.setItem("user", JSON.stringify(user));
              // localStorage.setItem("user", user);
              setSpinner(false);
              history.push("/dashboard");
            } else {
              setSpinner(false);
              setAuthenticationError(true);
            }
          });
        });
      }
    }
  };

  const renderAuthenticationErrorContent = () => {
    return (
      <>
        {authenticationError && (
          <>
            {
              <ErrorComponent
                authentication={() => setAuthenticationError(false)}
              />
            }
          </>
        )}
      </>
    );
  };
  return (
    <>
      {spinner && (
        <div className="_width-prop">
          <div className="loader"></div>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="_mlqpqoxqklxaml"
      >
        {showTeacherContext ? (
          <TeacherLoginComponent />
        ) : (
          <>
            <input
              type="text"
              ref={loginErrorRef}
              maxLength="15"
              autoCapitalize="off"
              name="personalNumber"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className={loginError ? "error _input" : "_input"}
              id="personal[number]"
              aria-label="Personal Number"
              placeholder="პირადი ნომერი"
              value={personalNumber}
              style={{ marginTop: "30px" }}
              onChange={(e) => {
                setPersonalNumber(e.target.value);
              }}
            />
            <br />
            {loginError ? (
              <p className="_error-paragraph">შეიყვანეთ პირადი ნომერი</p>
            ) : (
              <br />
            )}
            <input
              type="password"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className={passwordLoginError ? "error _input" : "_input"}
              id="password"
              ref={passwordErrorRef}
              aria-label="Password"
              placeholder="პაროლი"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            {passwordLoginError && (
              <p className="_error-paragraph">შეიყვანეთ პაროლი</p>
            )}
            <button
              onClick={loginAuthentication}
              type="submit"
              className={
                authenticationError
                  ? "button__login mtop"
                  : "mtop button__login"
              }
            >
              შესვლა
            </button>
          </>
        )}
        <br />
        <span
          className="teacher__context"
          onClick={() => renderTeacherContext()}
        >
          {showTeacherContext ? "მოსწავლე" : "მასწავლებელი"}
        </span>
      </form>
      {renderAuthenticationErrorContent()}
    </>
  );
}
