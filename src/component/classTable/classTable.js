import React, { useEffect, useState } from "react";
import db from "./../connectFirebase/firebase";
import Navbar from "./../navbar/Navbar";
import Sidebar from "./../sidebar/sidebar";
import "./../classTable/classTable.css";
import HomeComponent from "../studentDashboard/HomeComponent/HomeComponent";
import HomeWorkComponent from "../studentDashboard/homeWorkComponent/homeWorkComponent";

var k = 0;

export default function ClassTable({ match }) {
  const [homeComponent, setHomeComponent] = useState(false);
  const [subjectComponent, setSubjectComponent] = useState(true);
  const [homeWorkComponent, setHomeWorkComponent] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [table, setTable] = useState([]);
  useEffect(async () => {
    setSpinner(true);
    return await db
      .collection("Tables")
      .where("teacher_id", "==", localStorage.getItem("ID"))
      .where("class_id", "==", match.params.id)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((data) => {
          setTable(snapshot.docs.map((doc) => doc.data()));
        });
        setSpinner(false);
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
          <div className="xsom1"></div>
          <div className="hero__subject1">
            <table id="customers">
              <tr>
                <th className="th__stylesheet">ორშაბათი</th>
                <th className="th__stylesheet">სამშაბათი</th>
                <th className="th__stylesheet">ოთხშაბათი</th>
                <th className="th__stylesheet">ხუთშაბათი</th>
                <th className="th__stylesheet">პარასკევი</th>
              </tr>
              <tr>
                {table.map((item) => {
                  return (
                    <>
                      <td>
                        {item.monday.map((dat, i) => {
                          {
                            k = i + 1;
                          }
                          return (
                            <>
                              <div className="border__bottom__stylesheet">
                                {k}&nbsp; - &nbsp;
                                {!dat || dat == null ? "თავისუფალია" : dat}
                                <br />
                              </div>
                            </>
                          );
                        })}
                      </td>
                      <td>
                        {item.tuesday.map((data, i) => {
                          {
                            k = i + 1;
                          }
                          return (
                            <>
                              <div className="border__bottom__stylesheet">
                                {k}&nbsp; - &nbsp;{data}
                                <br />
                              </div>
                            </>
                          );
                        })}
                      </td>
                      <td>
                        {item.wednesday.map((data, i) => {
                          {
                            k = i + 1;
                          }
                          return (
                            <>
                              <div className="border__bottom__stylesheet">
                                {k}&nbsp; - &nbsp;
                                {!data || data == null ? "თავისუფალია" : data}
                                <br />
                              </div>
                            </>
                          );
                        })}
                      </td>
                      <td>
                        {item.thursday.map((data, i) => {
                          {
                            k = i + 1;
                          }
                          return (
                            <>
                              <div className="border__bottom__stylesheet">
                                {k}&nbsp; - &nbsp;
                                {!data || data == null ? "თავისუფალია" : data}
                                <br />
                              </div>
                            </>
                          );
                        })}
                      </td>
                      <td>
                        {item.friday.map((data, i) => {
                          {
                            k = i + 1;
                          }
                          return (
                            <>
                              <div className="border__bottom__stylesheet">
                                {k}&nbsp; - &nbsp;
                                {!data || data == null ? "თავისუფალია" : data}
                                <br />
                              </div>
                            </>
                          );
                        })}
                      </td>
                    </>
                  );
                })}
              </tr>
            </table>
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
      {console.log(table[0])}
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
