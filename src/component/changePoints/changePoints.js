import React, { useEffect, useState, useRef } from "react";

import Navbar from "./../navbar/Navbar";
import Sidebar from "./../sidebar/sidebar";
import db from "./../connectFirebase/firebase";
import "./changePoints.css";

export default function ({ match }) {
  const [students, setStudents] = useState([]);
  const [st, setSt] = useState(false);
  const [user, setUser] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    console.log(1);
    db.collection("Teachers")
      .where("ID", "==", localStorage.getItem("ID"))
      .get()
      .then((data) => {
        console.log(2);
        data.docs.map((studdoc) => {
          return db
            .collection("Teachers")
            .doc(studdoc.id)
            .collection("Classes")
            .get()
            .then((data) => {
              console.log(3);
              data.docs.map((classdoc) => {
                return (
                  db
                    .collection("Teachers")
                    .doc(studdoc.id)
                    .collection("Classes")
                    .where("class_id", "==", match.params.id)
                    // .doc(classdoc.id)
                    // .collection("Subjects")
                    // .where("subject_id", "==", localStorage.getItem("subject_id"))
                    .get()
                    .then((data) => {
                      console.log(4);
                      data.docs.map((subjectdoc) => {
                        // console.log(subjectdoc.id);
                        return (
                          db
                            .collection("Teachers")
                            .doc(studdoc.id)
                            .collection("Classes")
                            .doc(classdoc.id)
                            .collection("Subjects")
                            .where("class_id", "==", match.params.id)
                            // .collection("Students")
                            .where("subject_id", "==", match.params.subject)
                            .get()
                            .then((snapshot) => {
                              console.log(5);
                              snapshot.docs.map((data) => {
                                // setPoint(snapshot.docs.map((data) => data.data()));
                                // console.log(data.data());
                                return db
                                  .collection("Teachers")
                                  .doc(studdoc.id)
                                  .collection("Classes")
                                  .doc(classdoc.id)
                                  .collection("Subjects")
                                  .doc(data.id)
                                  .collection("Students")
                                  .get()
                                  .then((data) => {
                                    console.log(6);
                                    data.docs.map((doc) => {
                                      console.log(st);
                                      setStudents(
                                        data.docs.map(
                                          (item) => item.data().student_id
                                        )
                                      );
                                      setSt(true);
                                    });
                                  });
                              });
                              // setSpinner(false);
                            })
                        );
                      });
                    })
                );
              });
            });
        });
      });
  }, []);

  useEffect(() => {
    console.log(1);
    students.map((student) => {
      console.log("student", student);
      db.collection("Students")
        .where("ID", "==", student)
        // .get()
        .onSnapshot((data) => {
          data.docs.map((studdoc) => {
            // console.log("93939393");
            // setUser(data.docs.map((item) => item.data()));
            setUser((oldArray) => [...oldArray, studdoc.data()]);
            // return db.collection('Students')
            // .doc(data.id)
            // data.docs.map((studdoc) => {
            return db
              .collection("Students")
              .doc(studdoc.id)
              .collection("Classes")
              .get()
              .then((doc) => {
                doc.docs.map((classdoc) => {
                  return db
                    .collection("Students")
                    .doc(studdoc.id)
                    .collection("Classes")
                    .doc(classdoc.id)
                    .collection("Subjects")
                    .where("subject_id", "==", match.params.subject)
                    .get()
                    .then((doc) => {
                      doc.docs.map((subjectdoc) => {
                        // console.log(subjectdoc.data());
                        console.log(match.params.subject);
                        console.log(subjectdoc.id);

                        return db
                          .collection("Students")
                          .doc(studdoc.id)
                          .collection("Classes")
                          .doc(classdoc.id)
                          .collection("Subjects")
                          .doc(subjectdoc.id)
                          .collection("Points")
                          .get()
                          .then((doc) => {
                            doc.docs.map((pointdoc) => {
                              setPoints(doc.docs.map((item) => item.data()));
                              console.log(pointdoc.data());
                            });
                          });
                      });
                    });
                });
              });
            // });
          });
        });
    });
  }, [st]);
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="xsom"></div>
      <div className="hero__container" style={{ position: "absolute" }}>
        <div className="user-information">
          <table id="customers">
            <tr>
              <th>სახელი გვარი</th>
              <th>სწრებადობა</th>
              <th>დღე</th>
              <th>ქულა</th>
            </tr>
            {user.map((item, i) => {
              return (
                <>
                  <tr>
                    <td>
                      {item.name} {item.surname}
                    </td>
                    <td>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </td>
                    <td></td>
                    <td>{item.ID}</td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
