import React, { useState, useEffect } from "react";
import db from "./../../connectFirebase/firebase";
import "../studentHero/studentHero.css";
import { Link } from "react-router-dom";

function SubjectDashboard() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [gmlq, setGmlq] = useState([]);
  const [teachers, setTeachers] = useState([]);
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

  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    db.collection("Students")
      .where("ID", "==", localStorage.getItem("ID"))
      .get()
      .then((data) => {
        data.docs.map((studdoc) => {
          return db
            .collection("Students")
            .doc(studdoc.id)
            .collection("Classes")
            .get()
            .then((data) => {
              data.docs.map((classdoc) => {
                return db
                  .collection("Students")
                  .doc(studdoc.id)
                  .collection("Classes")
                  .doc(classdoc.id)
                  .collection("Subjects")
                  .onSnapshot((snapshot) => {
                    setGmlq(snapshot.docs.map((doc) => doc.data()));
                    // snapshot.docs.map((data) => console.log(data.data()));
                  });
              });
              setSpinner(false);
            });
        });
      });

    db.collection("Teachers").onSnapshot((data) => {
      setTeachers(data.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <>
      <div className="_1cont">
        {spinner ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="xsom"></div>
            <div className="hero__container">
              <div className="context__info">
                <p className="_class-para">საგნები</p>
                <p className="_class-name">{`${user.name} ${user.surname}`}</p>
              </div>
              <div className="xpm1mzl">
                {gmlq.map((item, i) => {
                  return (
                    <>
                      <Link
                        to={`/dashboard/student/${Math.floor(
                          Math.random() * 1923891238219832
                        )}`}
                        onClick={() => {
                          localStorage.setItem("subject_id", item.subject_id);
                        }}
                        className="_under"
                      >
                        <div
                          key={i.toString()}
                          className="hero__subject _under"
                          style={{
                            backgroundColor: `${colors[i]}`,
                            borderLeft: `${borders[i]}`,
                          }}
                        >
                          <i className="fas fa-external-link-alt asodmoasml"></i>
                          <label className="hero__subject__label">
                            {item.subject_id}
                          </label>
                          <label className="hero__subject__teacher _under">
                            მასწავლებელი: <br />
                            {teachers.map(
                              (data) =>
                                data.ID == item.teacher_id &&
                                `${data.name} ${data.surname}`
                            )}
                          </label>
                          <div className="_oxmkq">
                            <div className="bomqx aqpol">
                              საშ. ქულა:{" "}
                              <span className="_points-xoqm">10</span>
                            </div>
                            <div className="bomqx">
                              დასწრება:{" "}
                              <span className="_points-xoqm">100%</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SubjectDashboard;
