import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import db from "./../connectFirebase/firebase";
import "./profile.css";

export default function Profile() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

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
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="xsom"></div>
      <div className="container-user-information">
        <img src={user.image} alt="" className="image-container-for-user" />
        <div className="user-information-content">
          <h2>{`${user.name} ${user.surname}`}</h2>
          <label className="_label-cont">{`(${user.role})`}</label>
        </div>
        <ul className="_ul-content" style={{ listStyle: "none" }}>
          <li className="_li-content">
            <div className="_div-content">
              <label>კლასი: </label>
              <label>
                {post.map((item) => {
                  return <>{item.class_id}</>;
                })}
              </label>
            </div>
          </li>
          <br />
          <li className="_li-content">
            <div className="_div-content">
              <label>პირადი ნომერი: </label>
              <label>
                {post.map((item) => {
                  return <>{user.ID}</>;
                })}
              </label>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
