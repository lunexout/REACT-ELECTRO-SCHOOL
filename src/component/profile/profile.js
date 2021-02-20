import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import db from "./../connectFirebase/firebase";
import "./profile.css";
import HomeComponent from "../studentDashboard/HomeComponent/HomeComponent";
import HomeWorkComponent from "../studentDashboard/homeWorkComponent/homeWorkComponent";

export default function Profile() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [homeComponent, setHomeComponent] = useState(false);
  const [subjectComponent, setSubjectComponent] = useState(true);
  const [homeWorkComponent, setHomeWorkComponent] = useState(false);

  useEffect(() => {
    db.collection("Students")
      .where("ID", "==", localStorage.getItem("ID"))
      .get()
      .then((data) => {
        data.docs.map((studdoc) => {
          return db
            .collection("Students")
            .doc(studdoc.id)
            .collection("Classes")
            .onSnapshot((snapshot) =>
              setPost(snapshot.docs.map((doc) => doc.data()))
            );
        });
      });
  }, []);

  const identificationDashboard = () => {
    if (homeComponent) {
      return (
        <>
          <HomeComponent />
        </>
      );
    }
    if (subjectComponent) {
      return (
        <>
          <div className="xsom"></div>
          <div className="container-user-information">
            <img src={user.image} alt="" className="image-container-for-user" />
            <div className="user-information-content">
              <h2>{`${user.name} ${user.surname}`}</h2>
              <label className="_label-cont">{`(${user.role})`}</label>
            </div>
            <ul className="_ul-content" style={{ listStyle: "none" }}>
              <br />
              <li className="_li-content">
                <div className="_div-content">
                  <label>პირადი ნომერი: </label>
                  <label className="_label-class-component">
                    {localStorage.getItem("ID")}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </>
      );
    }
    if (homeWorkComponent) {
      return (
        <>
          <HomeWorkComponent />
        </>
      );
    }
  };

  const showHomeComponent = () => {
    setHomeComponent(true);
    setSubjectComponent(false);
    setHomeWorkComponent(false);
  };
  const showSubjectComponent = () => {
    setHomeComponent(false);
    setSubjectComponent(true);
    setHomeWorkComponent(false);
  };
  const showHomeWorkComponent = () => {
    setHomeComponent(false);
    setSubjectComponent(false);
    setHomeWorkComponent(true);
  };

  return (
    <>
      <Navbar />
      <Sidebar
        homeComponent={() => showHomeComponent()}
        homeClassComponent={
          homeComponent ? "_li-flex active act" : "_li-flex act"
        }
        homeComponentParagraph={
          homeComponent ? "_none-p active-cross" : "_none-p"
        }
        homeComponentSVG={homeComponent && "active-cross"}
        subjectComponent={() => showSubjectComponent()}
        subjectClassComponent={
          subjectComponent ? "_li-flex active act" : "_li-flex act"
        }
        subjectComponentSVG={subjectComponent && "active-cross"}
        subjectComponentParagraph={
          subjectComponent ? "_none-p active-cross" : "_none-p"
        }
        homeWorkComponent={() => showHomeWorkComponent()}
        homeWorkClassComponent={
          homeWorkComponent ? "_li-flex active act" : "_li-flex act"
        }
        homeWorkSVGComponent={homeWorkComponent && "active-cross"}
        homeWorkParagraphComponent={
          homeWorkComponent ? "_none-p active-cross" : "_none-p"
        }
      />
      {identificationDashboard()}
    </>
  );
}
