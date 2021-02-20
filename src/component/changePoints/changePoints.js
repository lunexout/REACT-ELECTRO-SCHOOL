import React, { useEffect, useRef, useState } from "react";
import HomeComponent from "../studentDashboard/HomeComponent/HomeComponent";
import Navbar from "./../navbar/Navbar";
import Sidebar from "./../sidebar/sidebar";
import db from "./../connectFirebase/firebase";
import "./changePoints.css";
import HomeWorkComponent from "../studentDashboard/homeWorkComponent/homeWorkComponent";
import SubjectDashboard from "../teacherDashboard/teacherDashboard";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function ({ match }) {
  const [students, setStudents] = useState([]);
  const [st, setSt] = useState(false);
  const [user, setUser] = useState([]);
  const [points, setPoints] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [homeComponent, setHomeComponent] = useState(false);
  const [subjectComponent, setSubjectComponent] = useState(true);
  const [homeWorkComponent, setHomeWorkComponent] = useState(false);

  const [toggleNextSave, setToggleNextSave] = useState(true);

  const history = useHistory();

  const pointTHRef = useRef();
  const pointTablesRef = useRef([]);
  const checkboxTablesRef = useRef([]);

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

      if (a == "აირჩიეთ ქულა" && check === false) {
        swrebadoba = "არა";
        pointTable.push({
          student_id: `${user.ID}`,
          checked: `${swrebadoba}`,
          point: null,
          // date: "12/1/2020",
          date: localStorage.getItem("todaysDate"),
          class_id: match.params.id,
          teacher_id: localStorage.getItem("ID"),
          subject_id: match.params.subject,
        });
      } else if (a == "აირჩიეთ ქულა") {
        console.log("ukacravad sheavset " + user.name + " " + "- s  veli");
        isError = true;
      } else {
        if (check === true) {
          swrebadoba = "კი";
          pointTable.push({
            student_id: `${user.ID}`,
            checked: `${swrebadoba}`,
            point: `${a}`,
            // date: "12/1/2020",
            date: localStorage.getItem("todaysDate"),
            class_id: match.params.id,
            teacher_id: localStorage.getItem("ID"),
            subject_id: match.params.subject,
          });
        }
        // else {
        //   swrebadoba = "არა";
        //   pointTable.push({
        //     student_id: `${user.ID}`,
        //     checked: `${swrebadoba}`,
        //     point: `${a}`,
        //     date: localStorage.getItem("todaysDate"),
        //     class_id: match.params.id,
        //     teacher_id: localStorage.getItem("ID"),
        //     subject_id: match.params.subject,
        //   });
        // }
      }
    });

    if (isError) {
      Swal.fire(
        "გთხოვთ შეავსოთ ყველა ნიშნის ველი",
        localStorage.getItem("todaysDate"),
        "error"
      );
    } else {
      localStorage.setItem("Swrebadoba", true);
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
      Swal.fire(
        "ნიშნები წარმატებით დაემატა",
        localStorage.getItem("todaysDate"),
        "success"
      );
      setSpinner(false);
    }
  };

  const identificationDashboard = () => {
    if (homeComponent) {
      return (
        <>
          <HomeComponent />
        </>
      );
    }

    function onClickNext() {
      setToggleNextSave(false);
      var pointTable = [];
      var isError = false;

      pointTHRef.current.style.display = "block";
      user.map((user) => {
        var check = document.getElementById(`checked${user.ID}`).checked;
        if (check == true) {
          pointTablesRef.current[user.ID].style.display = "block";
        } else {
          pointTablesRef.current[user.ID].style.display = "none";
          checkboxTablesRef.current[user.ID].style.display = "none";
        }
      });
    }

    if (SubjectDashboard) {
      return (
        <>
          {localStorage.getItem("Swrebadoba") ? (
            (console.log(1), history.push({ pathname: "/dashboard" }))
          ) : (
            <>
              <div className="xsom"></div>
              <div className="hero__container" style={{ position: "absolute" }}>
                <div className="dateCenter">
                  <Typography align="center">
                    {localStorage.getItem("todaysDate")}
                  </Typography>
                </div>
                {/* <div style={{ textAlign: "center" }}>
              {localStorage.getItem("todaysDate")}
            </div> */}
                <div className="user-information">
                  {spinner && (
                    <div className="_width-prop">
                      <div className="loader"></div>
                    </div>
                  )}
                  <tbody className="students" id="customers">
                    <tr>
                      <th style={{ textAlign: "center !important" }}>
                        სახელი გვარი
                      </th>
                      {/* <th>სახელი გვარი</th> */}
                      <th>სწრებადობა&nbsp;&nbsp;-&nbsp;&nbsp;კი / არა</th>
                      <th ref={pointTHRef} style={{ display: "none" }}>
                        ქულა
                      </th>
                    </tr>
                    {user.map((student, i) => {
                      return (
                        <>
                          <tr
                            ref={(el) =>
                              (checkboxTablesRef.current[student.ID] = el)
                            }
                          >
                            <td style={{ textAlign: "left" }}>
                              <div style={{ display: "flex" }}>
                                <div style={{ flex: ".5" }}>
                                  <img
                                    width="55"
                                    height="55"
                                    style={{
                                      borderRadius: "50%",
                                      display: "inline-block",
                                    }}
                                    src={student.image}
                                  />
                                </div>
                                <div
                                  style={{
                                    flex: "1",
                                    display: "inline-block",
                                  }}
                                >
                                  {student.name} {student.surname}
                                </div>
                              </div>
                            </td>
                            <td>
                              <label class="switch">
                                <input
                                  class="switch-input"
                                  type="checkbox"
                                  id={`checked${student.ID}`}
                                />
                                <span
                                  class="switch-label"
                                  data-on="კი"
                                  data-off="არა"
                                ></span>
                                <span class="switch-handle"></span>
                              </label>
                            </td>
                            <td
                              ref={(el) =>
                                (pointTablesRef.current[student.ID] = el)
                              }
                              style={{ display: "none" }}
                            >
                              <select
                                className="custom-select"
                                id={`select_table${student.ID}`}
                              >
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
                  </tbody>
                  {toggleNextSave ? (
                    <>
                      <Button
                        onClick={onClickNext}
                        m={3}
                        variant="contained"
                        style={{ fontFamily: "BPG Arial Caps" }}
                        color="primary"
                      >
                        შემდეგი
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={saveInformation}
                      m={3}
                      variant="contained"
                      color="primary"
                    >
                      შედეგების შენახვა
                    </Button>
                  )}
                  {/* <button onClick={saveInformation}>დამატება</button> */}
                </div>
              </div>
            </>
          )}
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
