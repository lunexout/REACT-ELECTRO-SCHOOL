import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/sidebar";
import "./pointerDashboard.css";
import db from "./../../connectFirebase/firebase";
import HomeComponent from "../HomeComponent/HomeComponent";
import HomeWorkComponent from "../homeWorkComponent/homeWorkComponent";
import { Link } from "react-router-dom";

export default function App() {
  // const [points, setPoints] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [point, setPoint] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [homeComponent, setHomeComponent] = useState(false);
  const [subjectComponent, setSubjectComponent] = useState(true);
  const [homeWorkComponent, setHomeWorkComponent] = useState(false);
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
          <div className="content_subject">
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div className="back-div-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  className="_back-div-icon-svg"
                  y="0px"
                  viewBox="0 0 195.4 322.4"
                >
                  <polygon points="117,161.4 0,283 41.1,322.4 195.4,161.4 41.1,0 0,39.4 " />
                </svg>
              </div>
              <p className="_back-ofmlqxml">უკან</p>
            </Link>
            <div className="content__person__information">
              <p>{localStorage.getItem("subject_id")}</p>
              <p className="student-name__content">{`${user.name} ${user.surname}`}</p>
              <tbody id="customers">
                <tr>
                  <th>#</th>
                  <th>დღე</th>
                  <th>მასწავლებელი</th>
                  <th>დასწრება</th>
                  {/* <th>განმავითარებელი შეფასება</th> */}
                  <th>შეფასება</th>
                </tr>
                {point.map((item, i) => {
                  return (
                    <>
                      <tr key={i.toString()}>
                        <td>{i}</td>
                        <td>{`${item.date}`}</td>
                        <td>
                          {teachers.map(
                            (data) =>
                              data.ID == item.teacher_id &&
                              `${data.name} ${data.surname}`
                          )}
                        </td>
                        <td>{item.checked}</td>
                        {/* <td>{item.point}</td>   */}
                        <td>{item.point}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </div>
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

  useEffect(() => {
    console.log("useEffect");
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
                  .where("subject_id", "==", localStorage.getItem("subject_id"))
                  .get()
                  .then((data) => {
                    data.docs.map((subjectdoc) => {
                      return db
                        .collection("Students")
                        .doc(studdoc.id)
                        .collection("Classes")
                        .doc(classdoc.id)
                        .collection("Subjects")
                        .doc(subjectdoc.id)
                        .collection("Points")
                        .onSnapshot((snapshot) => {
                          snapshot.docs.map((data) => {
                            setPoint(snapshot.docs.map((data) => data.data()));
                          });
                          setSpinner(false);
                        });
                    });
                  });
              });
            });
        });
      });

    db.collection("Teachers").onSnapshot((data) => {
      setTeachers(data.docs.map((doc) => doc.data()));
    });
  }, []);

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
      {spinner && (
        <div className="_width-prop">
          <div className="loader"></div>
        </div>
      )}
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
