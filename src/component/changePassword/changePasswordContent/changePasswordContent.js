import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../navbar/Navbar";
import "../changePassword.css";
import db from "../../connectFirebase/firebase";
import {useHistory} from 'react-router-dom'
import StudentChangePassword from "../studentChangePassword/studentChangePassword";
import TeacherChangePassword from "../teacherChangePassword/teacherChangePassword";

export default function ChangePassword() {
  const [nowPassword, setNowPassword] = useState("");
  const [nowPasswordError, setNowPasswordError] = useState(false);
  const nowPasswordErrorRef = useRef();
  const [nowPasswordOpen, setNowPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const newPasswordErrorRef = useRef();
  const [stringError, setStringError] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [newNowPasswordOpen, setNewNowPasswordOpen] = useState(false);
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [repeatNewPasswordError, setNewRepeatPasswordError] = useState(false);
  const repeatNewPasswordErrorRef = useRef();
  const [repeatNewPasswordOpen, setRepeatNewPasswordOpen] = useState(false);
  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [string, setString] = useState("");
  const [stringMap, setStringMap] = useState([]);
  const [stringMapID, setStringMapID] = useState("");
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const history = useHistory();

  useEffect(async () => {
    setSpinner(true);
    if (user.role === "მოსწავლე") {
    return await  db.collection("Students")
        .where("ID", "==", localStorage.getItem("ID"))
        .onSnapshot((snapshot) => {
          setStringMap(
            snapshot.docs.map((doc) => ({
              id: setStringMapID(doc.id),
            })),
            setString(snapshot.docs.map((doc) => doc.data().password))
          );
          setSpinner(false);
        });
    } else {
      return await db.collection("Teachers")
        .where("ID", "==", localStorage.getItem("ID"))
        .onSnapshot((snapshot) => {
          setStringMap(
            snapshot.docs.map((doc) => ({
              id: setStringMapID(doc.id),
            })),
            setString(snapshot.docs.map((doc) => doc.data().password))
          );
          setSpinner(false);
        });
    }
  }, []);

  async function successChangePassword() {
    // setSpinner(true);
    if (user.role === "მოსწავლე") {
      return await db.collection("Students").doc(stringMapID).update({
        password: newPassword,
      });
      // setSpinner(false);
    } else {
      // setSpinner(true);
      return await db.collection("Teachers").doc(stringMapID).update({
        password: newPassword,
      });
    }
    // setSpinner(false);
  }
  const identificationUserPassword = () => {
    if (!nowPassword) {
      setNowPasswordError(true);
      nowPasswordErrorRef.current.focus();
    } else if (!newPassword) {
      setNowPasswordError(false);
      setNewPasswordError(true);
      newPasswordErrorRef.current.focus();
    } else if (!repeatNewPassword) {
      setNowPasswordError(false);
      setNewPasswordError(false);
      setNewRepeatPasswordError(true);
      repeatNewPasswordErrorRef.current.focus();
    }
    else if (nowPassword != string) {
      setNowPasswordError(true);
      setStringError(true);
      nowPasswordErrorRef.current.focus();
      setPasswordDontMatch(false);
      setNewPasswordError(false);
      setNewRepeatPasswordError(false);
    } else if (newPassword !== repeatNewPassword) {
      setPasswordDontMatch(true);
      setNewPasswordError(true);
      setNewRepeatPasswordError(true);
      setNowPasswordError(false);
      setStringError(false);
    } else if(nowPassword === newPassword) {
        alert('emtxveva')
    }
    else {
      setPasswordDontMatch(false);
      setNewPasswordError(false);
      setNowPasswordError(false);
      setNewRepeatPasswordError(false);
      setStringError(false);
      history.push({pathname: '/dashboard'})
      {
        successChangePassword();
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
      <Navbar />
      <div className="xsom"></div>
      <div className="change__password">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="_mfpl">პაროლის შეცვლა</h1>
          {user.role === "მოსწავლე" ? (
            <>
              <StudentChangePassword
                nowPasswordOpen={nowPasswordOpen}
                nowPasswordError={nowPasswordError}
                nowPasswordErrorRef={nowPasswordErrorRef}
                nowPassword={nowPassword}
                newNowPasswordOpen={newNowPasswordOpen}
                newPassword={newPassword}
                newPasswordErrorRef={newPasswordErrorRef}
                newPasswordError={newPasswordError}
                repeatNewPassword={repeatNewPassword}
                repeatNewPasswordError={repeatNewPasswordError}
                repeatNewPasswordErrorRef={repeatNewPasswordErrorRef}
                repeatNewPasswordOpen={repeatNewPasswordOpen}
                eyeOpenCondition={() => setNowPasswordOpen(!nowPasswordOpen)}
                onChangeNowPassword={(e) => setNowPassword(e.target.value)}
                onChangeSetNewPassword={(e) => setNewPassword(e.target.value)}
                secondEyeOpenCondition={() =>
                  setNewNowPasswordOpen(!newNowPasswordOpen)
                }
                repeatNewPasswordProps={(e) =>
                  setRepeatNewPassword(e.target.value)
                }
                repeatNewPasswordCondition={() =>
                  setRepeatNewPasswordOpen(!repeatNewPasswordOpen)
                }
              />
            </>
          ) : (
            <TeacherChangePassword
              nowPasswordOpen={nowPasswordOpen}
              nowPasswordError={nowPasswordError}
              nowPasswordErrorRef={nowPasswordErrorRef}
              nowPassword={nowPassword}
              newNowPasswordOpen={newNowPasswordOpen}
              newPassword={newPassword}
              newPasswordErrorRef={newPasswordErrorRef}
              newPasswordError={newPasswordError}
              repeatNewPassword={repeatNewPassword}
              repeatNewPasswordError={repeatNewPasswordError}
              repeatNewPasswordErrorRef={repeatNewPasswordErrorRef}
              repeatNewPasswordOpen={repeatNewPasswordOpen}
              eyeOpenCondition={() => setNowPasswordOpen(!nowPasswordOpen)}
              onChangeNowPassword={(e) => setNowPassword(e.target.value)}
              onChangeSetNewPassword={(e) => setNewPassword(e.target.value)}
              secondEyeOpenCondition={() =>
                setNewNowPasswordOpen(!newNowPasswordOpen)
              }
              repeatNewPasswordProps={(e) =>
                setRepeatNewPassword(e.target.value)
              }
              repeatNewPasswordCondition={() =>
                setRepeatNewPasswordOpen(!repeatNewPasswordOpen)
              }
            />
          )}
          {passwordDontMatch && (
            <p className="pass-dont">პაროლები არ ემთხვევა</p>
          )}
          {stringError && (
            <p className="pass-dont">თქვენი ამჟამინდელი პაროლი არ ემთხვევა</p>
          )}
          <button
            type="submit"
            className="_btn_change"
            onClick={() => identificationUserPassword()}
          >
            შეცვლა
          </button>
        </form>
      </div>
    </>
  );
}
