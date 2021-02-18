import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from ".././sidebar/sidebar";
import db from "../connectFirebase/firebase";
import { Link } from "react-router-dom";
import './teacherDashboard.css'

export default function TeacherPage() {
  const [classes, setClasses] = useState([]);
  const [colors, setColors] = useState([
    "rgb(255, 113, 67)",
    "rgb(242, 159, 5)",
    "rgb(242, 135, 5)",
    "rgb(156, 204, 102)",
    "rgb(102, 187, 106)",
    "rgb(38, 165, 154)",
    "rgb(94, 192, 250)",
    "rgb(46, 49, 146)",
    "rgb(0, 77, 64)",
    "rgb(229, 63, 35)",
    "rgb(234, 161, 151)",
    "rgb(56, 142, 60)",
  ]);

  const [borders, setBorders] = useState([
    "3px solid rgb(245, 95, 46)",
    "3px solid rgb(230, 150, 0)",
    "3px solid rgb(222, 122, 0)",
    "3px solid rgb(140, 188, 86)",
    "3px solid rgb(84, 168, 88)",
    "3px solid rgb(30, 148, 138)",
    "3px solid rgb(53, 167, 235)",
    "3px solid rgb(38, 40, 125)",
    "3px solid rgb(1, 57, 47)",
    "3px solid rgb(209, 50, 24)",
    "3px solid rgb(222, 145, 135)",
    "3px solid rgb(53, 132, 57)",
  ]);
  useEffect(() => {
    db.collection("Teachers")
      .where("ID", "==", localStorage.getItem("ID"))
      .get()
      .then((tdoc) => {
        tdoc.docs.map((data) => {
          return db
            .collection("Teachers")
            .doc(data.id)
            .collection("Classes")
            .onSnapshot((snapshot) =>
              setClasses(snapshot.docs.map((doc) => doc.data()))
            );
        });
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="_1cont">
        <Sidebar />
        <div className="xsom"></div>
        <div className="hero__container">
          <div className="context__info">
            <p className="_class-para">კლასები</p>
          </div>
          <div className="xpm1mzl">
            {classes.map((item, i) => {
              return (
                <>
                
                  {/* <Link
                    to={`/dashboard/teacher/${item.class_id}`}
                    className="_under"
                  > */}
                    <div
                      className="hero__subject _under"
                      style={{
                        backgroundColor: `${colors[i]}`,
                        borderLeft: `${borders[i]}`,
                      }}
                    >
                      <Link
                      to={`/dashboard/teacher/${item.class_id}`}
                      className="_under"
                      >
                      <i className="fas fa-external-link-alt asodmoasml"></i>
                      </Link>
                      <label
                        className="hero__subject__teacher _under"
                        key={item.class_id}
                      >
                        კლასი: {item.class_id}
                      </label>
                      <label
                        className="hero__subject__teacher _under"
                        key={item.damrigebeli}
                      >
                        დამრიგებელი: {item.damrigebeli}
                      </label>
                    <Link to={`/dashboard/teacher/${item.class_id}/table`}><button className="showTableButton">ცხრილის ნახვა</button></Link>
                    </div>
                  {/* </Link> */}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
