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
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    db.collection("Teachers")
      .where("ID", "==", localStorage.getItem("ID"))
      .get()
      .then((data) => {
        data.docs.map((studdoc) => {
          return db
            .collection("Teachers")
            .doc(studdoc.id)
            .collection("Classes")
            .get()
            .then((data) => {
              data.docs.map((classdoc) => {
                return db
                  .collection("Teachers")
                  .doc(studdoc.id)
                  .collection("Classes")
                  .where("class_id", "==", match.params.id)
                  .get()
                  .then((data) => {
                    data.docs.map((subjectdoc) => {
                      return db
                        .collection("Teachers")
                        .doc(studdoc.id)
                        .collection("Classes")
                        .doc(classdoc.id)
                        .collection("Subjects")
                        .where("class_id", "==", match.params.id)
                        .where("subject_id", "==", match.params.subject)
                        .get()
                        .then((snapshot) => {
                          snapshot.docs.map((data) => {
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
                                data.docs.map((doc) => {
                                  setStudents(
                                    data.docs.map((item) => item.data())
                                  );
                                  setSt(true);
                                });
                              });
                          });
                        });
                    });
                  });
              });
            });
        });
      });
  }, []);

  useEffect(() => {
    // setSpinner(true);
    students.map((student) => {
      db.collection("Students")
        .where("ID", "==", student.student_id)
        .onSnapshot((data) => {
          data.docs.map((studdoc) => {
            setUser((oldArray) => [...oldArray, studdoc.data()]);
            // return db
            //   .collection("Students")
            //   .doc(studdoc.id)
            //   .collection("Classes")
            //   .get()
            //   .then((doc) => {
            //     doc.docs.map((classdoc) => {
            //       return db
            //         .collection("Students")
            //         .doc(studdoc.id)
            //         .collection("Classes")
            //         .doc(classdoc.id)
            //         .collection("Subjects")
            //         .where("subject_id", "==", match.params.subject)
            //         .get()
            //         .then((doc) => {
            //           doc.docs.map((subjectdoc) => {

            //             return db
            //               .collection("Students")
            //               .doc(studdoc.id)
            //               .collection("Classes")
            //               .doc(classdoc.id)
            //               .collection("Subjects")
            //               .doc(subjectdoc.id)
            //               .collection("Points")
            //               .get()
            //               .then((doc) => {
            //                 doc.docs.map((pointdoc) => {
            //                   console.log(pointdoc.data());
            //                   // setUser(doc.docs.map((item) => item.data()));
            //                 });
            //               });
            //           });
            //         });
            //     });
            //   });
          });
        });
    });
    // setSpinner(false);
  }, [st]);

  const saveInformation = () => {
    var pointTable = [];
    var isError = false;

    user.map((user) => {
      var swrebadoba = "";
      var a = document.getElementById(`select_table${user.ID}`).value;
      var check = document.getElementById(`checked${user.ID}`).checked;

      if (a == "აირჩიეთ ქულა") {
        console.log("ukacravad sheavset " + user.name + " " + "- s  veli");
        isError = true;
      } else {
        if (check === true) {
          swrebadoba = "კი";
          pointTable.push({
            student_id: `${user.ID}`,
            checked: `${swrebadoba}`,
            point: `${a}`,
            date: localStorage.getItem("todaysDate"),
            class_id: match.params.id,
            teacher_id: localStorage.getItem("ID"),
            subject_id: match.params.subject,
          });
        } else {
          swrebadoba = "არა";
          pointTable.push({
            student_id: `${user.ID}`,
            checked: `${swrebadoba}`,
            point: `${a}`,
            date: localStorage.getItem("todaysDate"),
            class_id: match.params.id,
            teacher_id: localStorage.getItem("ID"),
            subject_id: match.params.subject,
          });
        }
      }
    });

    if (isError) {
      alert("sheivsos velebi");
    } else {
      setSpinner(true);
      pointTable.map(async (item) => {
        return await db
          .collection("Students")
          .where("ID", "==", item.student_id)
          .onSnapshot((data) => {
            data.docs.map((studdoc) => {
              return db
                .collection("Students")
                .doc(studdoc.id)
                .collection("Classes")
                .where("class_id", "==", item.class_id)
                .onSnapshot((data) => {
                  data.docs.map((classdoc) => {
                    return db
                      .collection("Students")
                      .doc(studdoc.id)
                      .collection("Classes")
                      .doc(classdoc.id)
                      .collection("Subjects")
                      .where("subject_id", "==", item.subject_id)
                      .onSnapshot((data) => {
                        data.docs.map((subjectdoc) => {
                          return db
                            .collection("Students")
                            .doc(studdoc.id)
                            .collection("Classes")
                            .doc(classdoc.id)
                            .collection("Subjects")
                            .doc(subjectdoc.id)
                            .collection("Points")
                            .doc(item.date)
                            .set({
                              student_id: item.student_id,
                              checked: item.checked,
                              point: item.point,
                              date: item.date,
                              class_id: item.class_id,
                              teacher_id: item.teacher_id,
                              subject_id: item.subject_id,
                            });
                        });
                      });
                  });
                });
            });
          });
      });
      setSpinner(false);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="xsom"></div>
      <div className="hero__container" style={{ position: "absolute" }}>
        <div style={{ textAlign: "center" }}>
          {localStorage.getItem("todaysDate")}
        </div>
        <div className="user-information">
          {spinner && (
            <div className="_width-prop">
              <div className="loader"></div>
            </div>
          )}
          <table className="students" id="customers">
            <tr>
              <th>სახელი გვარი</th>
              <th>სწრებადობა</th>
              <th>ქულა</th>
            </tr>
            {user.map((student) => {
              return (
                <>
                  <tr>
                    <td>
                      {student.name} {student.surname}
                    </td>
                    <td>
                      <label class="switch">
                        <input type="checkbox" id={`checked${student.ID}`} />
                        <span class="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <select id={`select_table${student.ID}`}>
                        <option>აირჩიეთ ქულა</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
          <button onClick={saveInformation}>დამატება</button>
        </div>
      </div>
    </>
  );
}
