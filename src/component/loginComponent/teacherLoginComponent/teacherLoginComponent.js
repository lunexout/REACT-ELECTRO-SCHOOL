import React, { useState, useRef } from "react";
import db from "../../connectFirebase/firebase";
import { useHistory } from "react-router-dom";
import ErrorComponent from "../errorComponent";

export default function TeacherLoginComponent() {
  const [personalTeacherNumber, setPersonalTeacherNumber] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherLoginError, setTeacherLoginError] = useState(false);
  const [teacherPasswordError, setTeacherPasswordError] = useState(false);
  const [teacherAuthenticationError, setTeacherAuthenticationError] = useState(
    false
  );

  const [spinner, setSpinner] = useState(false);
  const teacherPersonalNumber = useRef();
  const teacherPasswordNumber = useRef();

  const history = useHistory();
  const loginAuthentication = async () => {
    if (!personalTeacherNumber) {
      setTeacherLoginError(true);
      teacherPersonalNumber.current.focus();
    } else if (!teacherPassword) {
      setTeacherLoginError(false);
      setTeacherPasswordError(true);
      teacherPasswordNumber.current.focus();
    } else {
      if (personalTeacherNumber.length > 1) {
        setTeacherLoginError(false);
        setTeacherPasswordError(false);
        setSpinner(true);
        return await db.collection("Teachers").onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((data) => {
            console.log(data.data());
            if (
              data.data().password === teacherPassword &&
              data.data().ID === personalTeacherNumber
            ) {
              console.log("teacher password", teacherPassword);
              setTeacherAuthenticationError(false);
              localStorage.setItem("login", "logged");
              localStorage.setItem("type", "teacher");
              localStorage.setItem("ID", personalTeacherNumber);
              localStorage.setItem("user", JSON.stringify(data.data()));
              setSpinner(false);
              history.push("/dashboard");
            } else {
              setSpinner(false);
              setTeacherAuthenticationError(true);
            }
          });
        });
      }
    }
  };
  return (
    <>
      {spinner && (
        <div className="_width-prop">
          <div className="loader"></div>
        </div>
      )}
      <input
        type="text"
        maxLength="15"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        ref={teacherPersonalNumber}
        spellCheck="false"
        className={teacherLoginError ? "_input error" : "_input"}
        id="teacher__id"
        style={{ marginTop: "30px" }}
        placeholder="პირადი ნომერი"
        aria-label="Personal Number"
        value={personalTeacherNumber}
        onChange={(e) => {
          setPersonalTeacherNumber(e.target.value);
        }}
      />
      {teacherLoginError ? (
        <>
          <p className="_error-paragraph">შეიყვანეთ პირადი ნომერი</p>
        </>
      ) : (
        <>
          <br />
          <br />
        </>
      )}
      <input
        type="password"
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        ref={teacherPasswordNumber}
        spellCheck="false"
        className={teacherPasswordError ? "_input error" : "_input _mtop"}
        id="teacher__password"
        placeholder="პაროლი"
        aria-label="Password"
        value={teacherPassword}
        onChange={(e) => {
          setTeacherPassword(e.target.value);
        }}
      />
      {teacherPasswordError ? (
        <p className="_error-paragraph">შეიყვანეთ პაროლი</p>
      ) : (
        <>
          <br />
          <br />
        </>
      )}
      {teacherAuthenticationError && (
        <ErrorComponent
          authentication={() => setTeacherAuthenticationError(false)}
        />
      )}
      <button
        onClick={loginAuthentication}
        type="submit"
        className={
          teacherAuthenticationError ? "button__login" : "button__login"
        }
      >
        შესვლა
      </button>
    </>
  );
}
